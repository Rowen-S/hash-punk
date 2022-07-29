import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Box, Text } from 'rebass'
import { darken } from 'polished'
import { Minus, Plus } from 'react-feather'
import Countdown from 'react-countdown'

import { useMintContract } from 'hooks/useContract'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useWalletModalToggle } from 'state/application/hooks'

import styled, { ThemeContext } from 'styled-components/macro'

import { AutoColumn } from 'components/Column'
import { ButtonYellow, ButtonYellow2 } from 'components/Button'
import Row, { RowFixed } from 'components/Row'
import TransactionSubmissionModal from 'components/TransactionSubmissionModal'

import { useActiveWeb3React } from 'hooks/web3'

import { defaultChainId } from 'constants/chains'

import { formatEther } from '@ethersproject/units'
import { BytesLike } from '@ethersproject/bytes'
import { BigNumberish } from '@ethersproject/bignumber'

import { switchToNetwork } from 'utils/switchToNetwork'
import { PinkCard } from 'components/Card'
import { useTransactionAdder } from 'state/transactions/hooks'
import { BigNumber } from '@ethersproject/bignumber'
import Loader from 'components/Loader'

import WhiteBList from './wlB.json'
import WhiteAList from './wlA.json'
import { NULL_ADDRESS } from 'utils'
import usePrevious from 'hooks/usePrevious'
import { Dots } from 'pages/styled'
import { TYPE } from 'theme'

interface Sign {
  account: string
  v: BigNumberish
  r: BytesLike
  s: BytesLike
}

const HomeWrapper = styled.main`
  width: 100%;
`

const HomeContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`
const MintOptionWrapper = styled(PinkCard)`
  color: ${({ theme }) => theme.text1};
  border: 4px dashed ${({ theme }) => theme.red3};
  padding: 1.5rem;
  user-select: none;
`

const MintButton = styled(ButtonYellow2)`
  box-shadow: 0px 8px 0px -2px ${({ theme }) => theme.bg3};
  :disabled {
    background: ${({ theme }) => theme.bg6};
  }
`
const MintInputWrapper = styled(Row)`
  justify-content: center;
`

const Operation = styled(ButtonYellow)`
  border-radius: 50%;
  box-shadow: 0px 6px 0px -2px ${({ theme }) => theme.bg3};
  width: unset;
  justify-content: center;
  cursor: pointer;
  border: none;
  &:active {
    box-shadow: 0 0 0 1pt ${darken(0.1, '#E7B44D')};
  }
`

// const INDEX_PUBLIC_ONE_FREE = 0
const INDEX_ALLOWLIST_ONE_FREE = 1

export default function Home() {
  const { account, chainId, library } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const mintContract = useMintContract()

  const addTransaction = useTransactionAdder()

  const showSwitchAMainnet = Boolean(chainId !== defaultChainId)
  const showAccount = Boolean(!account)

  const theme = useContext(ThemeContext)

  const [processing, setProcessing] = useState(false)

  const [nowTime, setNowTime] = useState<number>()

  const [{ startTime, endTime, mintPrice, wlAMax, wlBMax }, setInit] = useState<{
    startTime: number | undefined
    endTime: number | undefined
    mintPrice: BigNumber | undefined
    wlAMax: BigNumber | undefined
    wlBMax: BigNumber | undefined
  }>({
    startTime: undefined,
    endTime: undefined,
    mintPrice: undefined,
    wlAMax: undefined,
    wlBMax: undefined,
  })

  const [maxAmount, setMaxAmount] = useState<number>(5)

  const isWlA: Sign | undefined = useMemo(() => {
    if (!account) return
    return WhiteAList.find((x) => x.account.toLocaleLowerCase() == account.toLocaleLowerCase())
  }, [account])

  const isWlB: Sign | undefined = useMemo(() => {
    if (!account) return
    return WhiteBList.find((x) => x.account.toLocaleLowerCase() == account.toLocaleLowerCase())
  }, [account])

  // currently sold
  const currently = useSingleCallResult(mintContract, 'totalSupply')?.result?.[0]
  // total
  const total = useSingleCallResult(mintContract, 'maxTokenCount')?.result?.[0]

  const remainingAmount = useMemo(() => {
    if (!total || !currently) return 0
    return total - currently
  }, [total, currently])

  // const publicOneFree = useSingleCallResult(mintContract, 'oneFreeRemain', [INDEX_PUBLIC_ONE_FREE])?.result?.[0]
  const wlAOneFree = useSingleCallResult(mintContract, 'oneFreeRemain', [INDEX_ALLOWLIST_ONE_FREE])?.result?.[0]

  // numberMinted
  const accountMinted = useSingleCallResult(mintContract, 'numberMinted', [account ?? NULL_ADDRESS])?.result?.[0]
  // const accountBurned = useSingleCallResult(mintContract, 'numberBurned', [account ?? NULL_ADDRESS])?.result?.[0]
  // console.log(accountBurned)

  const init = useCallback(async () => {
    const startTime = await mintContract.startTime()
    const endTime = await mintContract.endTime()
    const mintPrice = await mintContract.PUBLIC_MINT_PRICE()
    // wla === free mint (200)
    const wlAMax = await mintContract.MAX_MINT_PER_ACCOUNT_PUB()

    const wlBMax = await mintContract.MAX_MINT_PER_ACCOUNT_WB()
    setInit({ startTime: startTime * 1000, endTime: endTime * 1000, wlAMax, wlBMax, mintPrice })
  }, [mintContract])

  const getNowTime = useCallback(() => {
    if (chainId == defaultChainId && library) {
      library.getBlock('latest').then((res) => {
        setNowTime(res.timestamp * 1000)
      })
    } else {
      setNowTime(undefined)
    }
  }, [library, chainId, setNowTime])

  // mint Max
  const [amount, setAmount] = useState('1')

  const [{ minting, minthash, mintErrorMessage }, setModal] = useState<{
    minting: boolean
    minthash: string | undefined
    mintErrorMessage: string | undefined
  }>({
    minting: false,
    minthash: undefined,
    mintErrorMessage: undefined,
  })

  const handlePlus = useCallback(
    (val: number) => {
      const afterTotal = val + 1
      if (afterTotal <= maxAmount) {
        setAmount(String(afterTotal))
      }
    },
    [maxAmount, setAmount]
  )

  const handleMinus = useCallback(
    (val: number) => {
      if (val > 1) {
        setAmount(String((val -= 1)))
      }
    },
    [setAmount]
  )

  const handleDismissSubmissionModal = useCallback(() => {
    setModal({
      minting: false,
      minthash: undefined,
      mintErrorMessage: undefined,
    })
  }, [setModal])

  const tenFreeMint = useCallback(
    async (sign: Sign) => {
      console.log('wl B Mint')
      if (!account) return
      const verify = await mintContract.checkSignature(
        sign.v,
        sign.r,
        sign.s,
        await mintContract.ALLOWLIST_TEN_FREEMINT_HASH_TYPE(),
        account
      )
      if (!verify) return
      setProcessing(true)
      setModal({
        minting: true,
        minthash,
        mintErrorMessage,
      })
      mintContract
        .allowListTenFreeMint(sign.v, sign.r, sign.s)
        .then((res) => {
          addTransaction(res)
          res.wait().finally(() => setProcessing(false))
          setModal({
            minting: true,
            minthash: res.hash,
            mintErrorMessage,
          })
        })
        .catch((err) => {
          setModal({
            minting: true,
            minthash,
            mintErrorMessage: err.message,
          })
          setProcessing(false)
        })
    },
    [mintContract, mintErrorMessage, minthash, account, addTransaction]
  )

  const oneFreeMint = useCallback(
    async (sign: Sign, expire) => {
      console.log('wl A Mint')
      if (!account) return
      const verify = await mintContract.checkSignature(
        sign.v,
        sign.r,
        sign.s,
        await mintContract.ALLOWLIST_ONE_FREEMINT_HASH_TYPE(),
        account
      )

      if (!mintPrice || !verify) return
      setProcessing(true)
      setModal({
        minting: true,
        minthash,
        mintErrorMessage,
      })
      const totalPrice = expire
        ? mintPrice.mul(amount)
        : parseInt(amount) > 1
        ? mintPrice.mul(parseInt(amount) - 1)
        : mintPrice.sub(mintPrice)

      mintContract
        .allowListOneFreeMint(sign.v, sign.r, sign.s, amount, {
          value: totalPrice,
        })
        .then((res) => {
          addTransaction(res)
          res.wait().finally(() => setProcessing(false))
          setModal({
            minting: true,
            minthash: res.hash,
            mintErrorMessage,
          })
        })
        .catch((err) => {
          setProcessing(false)
          setModal({
            minting: true,
            minthash,
            mintErrorMessage: err.message,
          })
        })
    },
    [mintContract, mintErrorMessage, amount, mintPrice, minthash, account, addTransaction]
  )
  const publicMint = useCallback(
    (isWlFree: boolean) => {
      console.log('publicMint')

      if (!mintPrice || !amount) return
      setProcessing(true)
      setModal({
        minting: true,
        minthash,
        mintErrorMessage,
      })
      const totalPrice = isWlFree
        ? parseInt(amount) > 1
          ? mintPrice.mul(parseInt(amount) - 1)
          : mintPrice.sub(mintPrice)
        : mintPrice.mul(amount)
      mintContract
        .publicMint(amount, {
          value: totalPrice,
        })
        .then((res) => {
          addTransaction(res)
          res.wait().finally(() => setProcessing(false))
          setModal({
            minting: true,
            minthash: res.hash,
            mintErrorMessage,
          })
        })
        .catch((err) => {
          setProcessing(false)
          setModal({
            minting: true,
            minthash,
            mintErrorMessage: err.message,
          })
        })
    },
    [mintContract, amount, mintPrice, mintErrorMessage, minthash, addTransaction]
  )

  const formatNumber = useCallback((num: number) => {
    return num.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })
  }, [])

  const wlRenderer = useCallback(
    ({
      hours,
      minutes,
      seconds,
      completed,
    }: {
      hours: number
      minutes: number
      seconds: number
      completed: boolean
    }) => {
      return (
        <AutoColumn gap="lg" justify={'center'}>
          {showAccount ? (
            <MintButton onClick={toggleWalletModal}>
              <Text>Connect</Text>
            </MintButton>
          ) : showSwitchAMainnet ? (
            <MintButton
              backgroundColor={theme.red1}
              onClick={() => {
                if (!library?.provider?.request || !chainId || !library?.provider?.isMetaMask) {
                  return
                }
                switchToNetwork({ library, chainId: defaultChainId })
              }}
            >
              <Text>Change Network</Text>
            </MintButton>
          ) : (
            <>
              {isWlA || isWlB ? (
                <>
                  <TYPE.largeHeader color={'success'}>You are Whitelisted!</TYPE.largeHeader>
                  {completed ? (
                    <>
                      <TYPE.mediumHeader color="success"> WL has timed out (30 mins) </TYPE.mediumHeader>
                      <TYPE.mediumHeader color="success">You can participate in the public sale</TYPE.mediumHeader>
                    </>
                  ) : (
                    <>
                      <TYPE.mediumHeader fontSize={44}>
                        {formatNumber(hours)}:{formatNumber(minutes)}:{formatNumber(seconds)}
                      </TYPE.mediumHeader>

                      <TYPE.mediumHeader color="success">left to mint your WL</TYPE.mediumHeader>

                      <TYPE.mediumHeader>Only first 1000 WL can get free mint</TYPE.mediumHeader>
                      <TYPE.mediumHeader>
                        WL mint {wlAOneFree ? 1000 - wlAOneFree.toNumber() : 0} /1000
                      </TYPE.mediumHeader>
                    </>
                  )}

                  <TYPE.mediumHeader>
                    First NFT free, the rest {mintPrice ? formatEther(mintPrice) : 0.019}eth each,
                  </TYPE.mediumHeader>
                  <TYPE.mediumHeader> 5 max per wallet</TYPE.mediumHeader>
                </>
              ) : (
                <>
                  <TYPE.largeHeader color={'success'}>PUBLIC SALE</TYPE.largeHeader>
                  <TYPE.mediumHeader>
                    {mintPrice ? formatEther(mintPrice) : 0.019}eth each, 5 max per wallet
                  </TYPE.mediumHeader>
                </>
              )}

              <MintInputWrapper>
                <Operation
                  onClick={() => handlePlus(parseInt(amount))}
                  disabled={Number(amount) >= maxAmount || Boolean(isWlB)}
                >
                  <Plus size={18} />
                </Operation>
                <Text width={16} textAlign={'center'} marginX={30}>
                  {amount ?? 0}
                </Text>

                {/* <MintInput value={amount} disabled onUserInput={(val) => handleAmountInput(val)} placeholder="0" /> */}
                <Operation
                  onClick={() => handleMinus(parseInt(amount))}
                  disabled={parseInt(amount) <= 1 || Boolean(isWlB)}
                >
                  <Minus size={18} />
                </Operation>
              </MintInputWrapper>
              {remainingAmount != 0 ? (
                accountMinted == 0 ? (
                  isWlB && remainingAmount >= 10 ? (
                    <MintButton disabled={processing} onClick={() => tenFreeMint(isWlB)}>
                      {processing ? <Dots>Pending</Dots> : <Text>MINT</Text>}
                    </MintButton>
                  ) : isWlA && wlAOneFree > 0 ? (
                    <MintButton disabled={processing} onClick={() => oneFreeMint(isWlA, completed)}>
                      {processing ? <Dots>Pending</Dots> : <Text>MINT</Text>}
                    </MintButton>
                  ) : (
                    //: publicOneFree > 0 ? (
                    //<MintButton onClick={() => publicMint(true)}>
                    // <Text>One Free Mint</Text>
                    // </MintButton>
                    //)
                    <MintButton
                      onClick={() => publicMint(false)}
                      disabled={processing || remainingAmount + amount > total}
                    >
                      {processing ? <Dots>Pending</Dots> : <Text>MINT</Text>}
                    </MintButton>
                  )
                ) : accountMinted > 0 && accountMinted < 5 ? (
                  <MintButton disabled={processing} onClick={() => publicMint(false)}>
                    {processing ? <Dots>Pending</Dots> : <Text>MINT</Text>}
                  </MintButton>
                ) : (
                  <MintButton disabled>Used</MintButton>
                )
              ) : (
                <MintButton disabled>
                  <Text>SOLD OUT</Text>
                </MintButton>
              )}
            </>
          )}
        </AutoColumn>
      )
    },
    [
      amount,
      total,
      chainId,
      library,
      mintPrice,
      showAccount,
      showSwitchAMainnet,
      theme,
      maxAmount,
      isWlA,
      isWlB,
      accountMinted,
      // publicOneFree,
      remainingAmount,
      wlAOneFree,
      processing,
      formatNumber,
      handleMinus,
      handlePlus,
      toggleWalletModal,
      tenFreeMint,
      oneFreeMint,
      publicMint,
    ]
  )

  const initRenderer = useCallback(
    ({
      hours,
      minutes,
      seconds,
      completed,
    }: {
      hours: number
      minutes: number
      seconds: number
      completed: boolean
    }) => {
      // Renderer callback with condition
      if (completed) {
        // Render a completed state
        return nowTime && <Countdown now={() => nowTime} date={endTime} renderer={wlRenderer} />
      } else {
        // Render a countdown
        return (
          <Text fontSize={55}>
            {formatNumber(hours)}:{formatNumber(minutes)}:{formatNumber(seconds)}
          </Text>
        )
      }
    },
    [endTime, nowTime, wlRenderer, formatNumber]
  )

  useEffect(() => {
    if (isWlB && wlBMax?.gt(0)) {
      setAmount(wlBMax.toString() ?? '10')
      setMaxAmount(wlBMax.toNumber() ?? 10)
    }
    if (
      (wlAMax && wlAMax.gt(0) && isWlA && accountMinted && accountMinted.gte(0)) ||
      (wlAMax && wlAMax?.gt(0) && !isWlB && !isWlA && accountMinted && accountMinted.gte(0))
    ) {
      setAmount(wlAMax.sub(accountMinted).toString() ?? '5')
      setMaxAmount(wlAMax.sub(accountMinted).toNumber() ?? 5)
    }
    // eslint-disable-next-line
  }, [isWlB, wlBMax, wlAMax, setMaxAmount])

  const previousMinted = usePrevious(accountMinted)

  useEffect(() => {
    if (!accountMinted || !previousMinted) return
    if (!accountMinted.eq(previousMinted)) {
      if (isWlB && wlBMax && wlBMax.gt(0)) {
        setAmount(wlBMax.sub(accountMinted).toString())
        setMaxAmount(wlBMax.sub(accountMinted).toNumber())
      }
      if ((isWlA && wlAMax) || (!isWlA && !isWlB && wlAMax)) {
        setAmount(wlAMax.sub(accountMinted).toString())
        setMaxAmount(wlAMax.sub(accountMinted).toNumber())
      }
    }
  }, [accountMinted, isWlA, isWlB, wlBMax, wlAMax, previousMinted])

  useEffect(() => {
    if (!nowTime) return
    const addNowTime = () => {
      setNowTime(nowTime + 1000)
    }

    const timerId = setInterval(addNowTime, 1000)

    chainId != defaultChainId ? setNowTime(undefined) : null

    return () => {
      clearInterval(timerId)
    }
  }, [nowTime, chainId])

  useEffect(() => {
    if (account && chainId == defaultChainId) {
      init()
      getNowTime()
    }
    return () => {
      setInit({
        startTime: undefined,
        endTime: undefined,
        mintPrice: undefined,
        wlAMax: undefined,
        wlBMax: undefined,
      })
    }
  }, [account, chainId, init, getNowTime, setInit])

  return (
    <HomeWrapper>
      <TransactionSubmissionModal
        isOpen={minting}
        hash={minthash}
        onDismiss={handleDismissSubmissionModal}
        errorMessage={mintErrorMessage}
      />
      <HomeContainer>
        <MintOptionWrapper width={['90%', '70%', '50%']}>
          <AutoColumn justify={'center'} gap="lg">
            <RowFixed>
              <Text fontSize={53}>{currently ? Number(currently || 0) : '-'}</Text>
              <Text fontSize={35}>&nbsp;/&nbsp;{Number(total || 8888)}</Text>
            </RowFixed>

            {startTime && nowTime ? (
              <Countdown now={() => nowTime} date={startTime} renderer={initRenderer} />
            ) : (
              <Loader />
            )}

            {showAccount ? (
              <>
                <AutoColumn gap="sm">
                  <Row>
                    <TYPE.mediumHeader color={'success'}>Public sale:</TYPE.mediumHeader>
                    <TYPE.subHeader paddingX={10}> 0.019eth each, 5 max per wallet</TYPE.subHeader>
                  </Row>
                  <AutoColumn gap="4px">
                    <Row>
                      <TYPE.mediumHeader color={'success'}>WL mint: </TYPE.mediumHeader>
                      <TYPE.subHeader paddingX={10}> Only first 1000 WL can get free mint, FCFS.</TYPE.subHeader>
                    </Row>
                    <Text>First NFT free, the rest 0.019 each, 5 max per wallet</Text>
                    <Text> you will only have 30 mins to mint WL, 3:00 PM UTC - 3:30 PM UTC</Text>
                  </AutoColumn>
                </AutoColumn>
                <MintButton onClick={toggleWalletModal}>
                  <Text>connect your wallet</Text>
                </MintButton>
              </>
            ) : showSwitchAMainnet ? (
              <MintButton
                backgroundColor={theme.red1}
                onClick={() => {
                  if (!library?.provider?.request || !chainId || !library?.provider?.isMetaMask) {
                    return
                  }
                  switchToNetwork({ library, chainId: defaultChainId })
                }}
              >
                <Text>Change Network</Text>
              </MintButton>
            ) : null}
          </AutoColumn>
        </MintOptionWrapper>
      </HomeContainer>
    </HomeWrapper>
  )
}
