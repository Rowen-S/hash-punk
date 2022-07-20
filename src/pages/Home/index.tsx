import { useCallback, useContext, useEffect, useState } from 'react'
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

import { parseEther, formatEther } from '@ethersproject/units'

import { switchToNetwork } from 'utils/switchToNetwork'
import { LightGreyCard } from 'components/Card'
import { useTransactionAdder } from 'state/transactions/hooks'
import { BigNumber } from '@ethersproject/bignumber'
import Loader from 'components/Loader'

const HomeWrapper = styled.main`
  width: 100%;
  min-height: 100vh;
`

const HomeContainer = styled(Box)<{ image: string }>`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
  background-size: cover;
  background-position: center;
`
const MintOptionWrapper = styled(LightGreyCard)`
  border: 4px dashed ${({ theme }) => theme.red3};
  padding: 1.5rem;
  width: 50%;
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

export default function Home() {
  const { account, chainId, library } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const mintContract = useMintContract()

  const addTransaction = useTransactionAdder()

  const showSwitchAMainnet = Boolean(chainId !== defaultChainId)
  const showAccount = Boolean(!account)

  const theme = useContext(ThemeContext)
  const [{ startTime, endTime, mintPrice, wlAMax, wlBMax }, setInit] = useState<{
    startTime: number | undefined
    endTime: number | undefined
    mintPrice: BigNumber | undefined
    wlAMax: any
    wlBMax: any
  }>({
    startTime: undefined,
    endTime: undefined,
    mintPrice: undefined,
    wlAMax: undefined,
    wlBMax: undefined,
  })

  const [maxAmount, setMaxAmount] = useState<number>(0)
  console.log(maxAmount)

  // currently sold
  const currently = useSingleCallResult(mintContract, 'totalSupply')?.result?.[0]
  // total
  const total = useSingleCallResult(mintContract, 'maxTokenCount')?.result?.[0]

  const isWlB = true

  const init = useCallback(async () => {
    const startTime = await mintContract.startTime()
    const endTime = await mintContract.endTime()
    const mintPrice = await mintContract.PUBLIC_MINT_PRICE()
    // wla === free mint (200)
    const wlAMax = await mintContract.MAX_MINT_PER_ACCOUNT_PUB()
    const wlBMax = await mintContract.MAX_MINT_PER_ACCOUNT_WB()

    console.log('init', wlAMax, wlBMax)
    setInit({ startTime: startTime * 1000, endTime: endTime * 1000, wlAMax, wlBMax, mintPrice })
  }, [mintContract])

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
      const totalSupply = val + 1
      if (totalSupply <= maxAmount) {
        setAmount(val >= maxAmount ? String(val) : String(val + 1))
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

  const mintPublicSale = useCallback(
    () => {
      setModal({
        minting: true,
        minthash,
        mintErrorMessage,
      })
      // const totalPrice = parseEther('0.05').mul(amount)
      // mintContract
      //   .mintPublicSale(amount, { value: totalPrice })
      //   .then(async (result: TransactionResponse) => {
      //     const { wait, hash } = result
      //     setModal({
      //       minting: true,
      //       mintErrorMessage,
      //       minthash: hash,
      //     })
      //     if (wait) {
      //       await wait().then((res: any) => {
      //         const { transactionHash, status } = res
      //         if (status === 1) {
      //           addPopup(
      //             {
      //               txn: {
      //                 hash: transactionHash,
      //                 success: true,
      //                 summary: t`Transaction confirmed`,
      //               },
      //             },
      //             transactionHash,
      //             DEFAULT_TXN_DISMISS_MS
      //           )
      //         } else {
      //           addPopup(
      //             {
      //               txn: {
      //                 hash: transactionHash,
      //                 success: false,
      //                 summary: t`Transaction failed`,
      //               },
      //             },
      //             transactionHash,
      //             L2_TXN_DISMISS_MS
      //           )
      //         }
      //       })
      //     }
      //   })
      //   .catch((err: any) => {
      //     setModal({
      //       minting: true,
      //       minthash,
      //       mintErrorMessage: err.message,
      //     })
      //   })
    },
    // eslint-disable-next-line
    [mintContract, account, amount]
  )

  const formatNumber = useCallback((num: number) => {
    return num.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })
  }, [])

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
      const wlRenderer = ({
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
            {!completed && (
              <Text fontSize={44}>
                {formatNumber(hours)}:{formatNumber(minutes)}:{formatNumber(seconds)}
              </Text>
            )}
            <Text fontSize={22}>1 NFT costs {mintPrice ? formatEther(mintPrice) : 0.01} ETH</Text>
            <Text fontSize={18}>Excluding gas Fees.</Text>
            <Text fontSize={18}>Click buy to mint your NFT.</Text>

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
            ) : !completed ? (
              <>
                <MintInputWrapper>
                  <Operation onClick={() => handlePlus(parseInt(amount))} disabled={Number(amount) >= maxAmount}>
                    <Plus size={18} />
                  </Operation>
                  <Text width={16} textAlign={'center'} marginX={30}>
                    {amount ?? 0}
                  </Text>

                  {/* <MintInput value={amount} disabled onUserInput={(val) => handleAmountInput(val)} placeholder="0" /> */}
                  <Operation onClick={() => handleMinus(parseInt(amount))} disabled={parseInt(amount) == 1}>
                    <Minus size={18} />
                  </Operation>
                </MintInputWrapper>
                {Number(currently) >= Number(total) ? (
                  <MintButton>
                    <Text>SOLD OUT</Text>
                  </MintButton>
                ) : (
                  <MintButton onClick={mintPublicSale}>
                    <Text>MINT</Text>
                  </MintButton>
                )}
              </>
            ) : (
              <>
                <MintInputWrapper>
                  <Operation
                    onClick={() => handlePlus(parseInt(amount))}
                    // disabled={Number(amount) + Number(mintedForPublic) >= maxPublicMint}
                  >
                    <Plus size={18} />
                  </Operation>
                  <Text width={16} textAlign={'center'} marginX={30}>
                    {amount ?? 0}
                  </Text>

                  {/* <MintInput value={amount} disabled onUserInput={(val) => handleAmountInput(val)} placeholder="0" /> */}
                  <Operation onClick={() => handleMinus(parseInt(amount))} disabled={parseInt(amount) == 1}>
                    <Minus size={18} />
                  </Operation>
                </MintInputWrapper>
                {Number(currently) >= Number(total) ? (
                  <MintButton>
                    <Text>SOLD OUT</Text>
                  </MintButton>
                ) : (
                  <MintButton onClick={mintPublicSale}>
                    <Text>MINT</Text>
                  </MintButton>
                )}
              </>
            )}
          </AutoColumn>
        )
      }
      if (completed) {
        // Render a completed state
        return <Countdown date={endTime} renderer={wlRenderer} />
      } else {
        // Render a countdown
        return (
          <Text fontSize={55}>
            {formatNumber(hours)}:{formatNumber(minutes)}:{formatNumber(seconds)}
          </Text>
        )
      }
    },
    [
      endTime,
      amount,
      chainId,
      currently,
      library,
      mintPrice,
      showAccount,
      showSwitchAMainnet,
      theme,
      total,
      handleMinus,
      handlePlus,
      mintPublicSale,
      toggleWalletModal,
      formatNumber,
    ]
  )

  useEffect(() => {
    if (isWlB) {
      setAmount(String(10))
      setMaxAmount(10)
    } else {
      setAmount(String(5))
      setMaxAmount(5)
    }
    return () => {
      console.log('init')
    }
  }, [isWlB])

  useEffect(() => {
    if (account && chainId == defaultChainId) {
      init()
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
  }, [account, chainId, init, setInit])

  return (
    <HomeWrapper>
      <TransactionSubmissionModal
        isOpen={minting}
        hash={minthash}
        onDismiss={handleDismissSubmissionModal}
        errorMessage={mintErrorMessage}
      />
      <HomeContainer image={'/config/images/bg.png'}>
        <MintOptionWrapper>
          <AutoColumn justify={'center'} gap="lg">
            <RowFixed>
              <Text fontSize={53}>{Number(currently || 0)}</Text>
              <Text fontSize={35}>&nbsp;/&nbsp;{Number(total || 0)}</Text>
            </RowFixed>
            {startTime ? <Countdown date={startTime} renderer={initRenderer} /> : <Loader />}
          </AutoColumn>
        </MintOptionWrapper>
      </HomeContainer>
    </HomeWrapper>
  )
}
