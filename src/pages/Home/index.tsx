import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { t } from '@lingui/macro'
import { Color } from 'theme/styled'
import { Text } from 'rebass'
import { darken } from 'polished'
import ReactGA from 'react-ga'

import { useCherryContract } from 'hooks/useContract'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useAddPopup } from 'state/application/hooks'

import styled, { ThemeContext } from 'styled-components/macro'

import Column, { AutoColumn } from 'components/Column'
import { ButtonEmpty } from 'components/Button'
import Row, { RowBetween, RowFixed, RowFlat } from 'components/Row'
import NumericalInput from 'components/NumericalInput'
import TransactionSubmissionModal from 'components/TransactionSubmissionModal'
import { DEFAULT_TXN_DISMISS_MS, L2_TXN_DISMISS_MS } from 'constants/misc'

import { useActiveWeb3React } from 'hooks/web3'

import { defaultChainId } from 'constants/chains'

import { TransactionResponse } from '@ethersproject/providers'
import { parseEther } from '@ethersproject/units'

import BannerImg from 'assets/images/banner.png'
import YellowbuttonBg from 'assets/images/yellow-button.png'

import Jun from 'assets/images/jiu.png'
import One from 'assets/images/x1.png'
import Two from 'assets/images/x2.png'

const HomeWrapper = styled.main`
  width: 100%;
  min-height: 100vh;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0px 20px;
  `};
`

const BannerOptionWraper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: url(${BannerImg}) center center / cover no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    overflow-x: auto;
  `};
`
const MintOptionWrapper = styled(Row)`
  background: #fff0c6;
  padding: 0.875rem 2.875rem;

  border-radius: 64px;
  position: absolute;
  width: 800px;
  bottom: 4.375rem;
  justify-content: flex-end;
`
const MintWrapper = styled(RowFlat)`
  position: relative;
  bottom: 0;
  right: 0;
  align-items: center;
`

const AlcoholImg = styled.img`
  position: absolute;
  width: 120px;
  height: 180px;
  bottom: 0;
  left: 3.625rem;
`
const MintButton = styled(ButtonEmpty)<{ color?: Color; open?: boolean }>`
  position: relative;
  width: 10.75rem;
  height: 5.3125rem;
  background: url(${YellowbuttonBg}) center center / cover no-repeat;
  background-size: 100% 100%;
  color: ${({ theme }) => theme.text1};
`
const DoubleImg = styled.img`
  position: absolute;
  right: 0;
  top: -5px;
  width: 3.375rem;
  height: 3.25rem;
`

export default function Home() {
  const { account, chainId } = useActiveWeb3React()
  const theme = useContext(ThemeContext)
  const addPopup = useAddPopup()
  const cherryContract = useCherryContract()
  const showSwitchAMainnet = Boolean(chainId !== defaultChainId)
  // mint Max
  const [mintNum, setMintNum] = useState<number>(0)
  const [mintAmount, setMintAmount] = useState('2')

  const [{ minting, minthash, mintErrorMessage }, setModal] = useState<{
    minting: boolean
    minthash: string | undefined
    mintErrorMessage: string | undefined
  }>({
    minting: false,
    minthash: undefined,
    mintErrorMessage: undefined,
  })

  // mint status
  const [{ type, r, s, v }, setMintSign] = useState<{
    type: 'raffle' | 'presale' | undefined
    r: string | undefined
    s: string | undefined
    v: number | undefined
  }>({
    type: undefined,
    r: undefined,
    s: undefined,
    v: undefined,
  })

  //totalMint
  const availableMint = type === 'presale' || type === 'raffle' ? 2 : !type ? 3 : 0

  // _config
  const config = useSingleCallResult(cherryContract, '_config').result
  console.log(config)

  // totalSupply
  const totalSupply = useSingleCallResult(cherryContract, 'totalSupply').result

  const handleDismissSubmissionModal = useCallback(() => {
    setModal({
      minting: false,
      minthash: undefined,
      mintErrorMessage: undefined,
    })
  }, [setModal])

  const handleAmountInput = useCallback(
    (value: string) => {
      value = value.replace(/\D+/, '')
      const lastMint = availableMint - mintNum
      setMintAmount(Number(value) >= lastMint ? String(lastMint) : value)
    },
    [availableMint, mintNum, setMintAmount]
  )

  // setMintNum
  const getPreSaleMinted = useCallback(async () => {
    if (type === 'presale') {
      const sum = await cherryContract?._presaleMinted(account)
      setMintNum(sum)
      setMintAmount((availableMint - sum).toString())
    }
  }, [cherryContract, availableMint, account, type, setMintNum, setMintAmount])
  // setMintNum

  const getRafSaleMinted = useCallback(async () => {
    if (type === 'raffle') {
      const sum = await cherryContract?._raffleSaleMinted(account)
      setMintNum(sum)
      setMintAmount((availableMint - sum).toString())
    }
  }, [cherryContract, availableMint, account, type, setMintNum])

  //setMintNum
  const getPublicSaleMinted = useCallback(async () => {
    if (config?.isPublicSaleActive) {
      const sum = await cherryContract?._publicSaleMinted(account)
      setMintNum(sum)
      setMintAmount((availableMint - sum).toString())
    }
  }, [cherryContract, availableMint, account, config, setMintNum])

  /**
   * public mint
   */

  const publicSaleMint = useCallback(async () => {
    setModal({
      minting: true,
      minthash,
      mintErrorMessage,
    })

    // presalePrice gas
    const price = parseEther('0.0001').mul(config?.publicSalePrice).mul(mintAmount)

    // sekiraRaffleSaleMint
    cherryContract
      ?.sekiraPublicMint(mintAmount, { value: price })
      .then(async (result: TransactionResponse) => {
        const { wait, hash } = result
        setModal({
          minting: true,
          mintErrorMessage,
          minthash: hash,
        })
        ReactGA.event({
          category: 'Mint',
          action: 'public Mint w/ Send',
          label: [account, mintAmount].join('/'),
        })
        if (wait) {
          await wait()
            .then((res: any) => {
              const { transactionHash, status } = res
              if (status === 1) {
                addPopup(
                  {
                    txn: {
                      hash: transactionHash,
                      success: true,
                      summary: t`Transaction confirmed`,
                    },
                  },
                  transactionHash,
                  DEFAULT_TXN_DISMISS_MS
                )
              } else {
                addPopup(
                  {
                    txn: {
                      hash: transactionHash,
                      success: false,
                      summary: t`Transaction failed`,
                    },
                  },
                  transactionHash,
                  L2_TXN_DISMISS_MS
                )
              }
            })
            .finally(() => getPublicSaleMinted())
        }
      })
      .catch((err: any) => {
        setModal({
          minting: true,
          minthash,
          mintErrorMessage: err.message,
        })
      })
    // eslint-disable-next-line
  }, [account, mintAmount, cherryContract, config, addPopup, getPublicSaleMinted])

  /**
   * presale mint
   */
  const presaleSaleMint = useCallback(async () => {
    setModal({
      minting: true,
      minthash,
      mintErrorMessage,
    })

    // presalePrice gas
    const price = parseEther('0.0001').mul(config?.presalePrice).mul(mintAmount)

    // sekiraRaffleSaleMint
    cherryContract
      ?.sekiraPresaleMint(mintAmount, v, r, s, { value: price })
      .then(async (result: TransactionResponse) => {
        const { wait, hash } = result
        setModal({
          minting: true,
          mintErrorMessage,
          minthash: hash,
        })
        ReactGA.event({
          category: 'Mint',
          action: 'presale Mint w/ Send',
          label: [account, mintAmount].join('/'),
        })
        if (wait) {
          await wait()
            .then((res: any) => {
              const { transactionHash, status } = res
              if (status === 1) {
                addPopup(
                  {
                    txn: {
                      hash: transactionHash,
                      success: true,
                      summary: t`Transaction confirmed`,
                    },
                  },
                  transactionHash,
                  DEFAULT_TXN_DISMISS_MS
                )
              } else {
                addPopup(
                  {
                    txn: {
                      hash: transactionHash,
                      success: false,
                      summary: t`Transaction failed`,
                    },
                  },
                  transactionHash,
                  L2_TXN_DISMISS_MS
                )
              }
            })
            .finally(() => getPreSaleMinted())
        }
      })
      .catch((err: any) => {
        setModal({
          minting: true,
          minthash,
          mintErrorMessage: err.message,
        })
      })
    // eslint-disable-next-line
  }, [account, mintAmount, v, r, s, cherryContract, config, addPopup, getPreSaleMinted])

  /**
   * raffle mint
   */
  const raffleSaleMint = useCallback(async () => {
    setModal({
      minting: true,
      minthash,
      mintErrorMessage,
    })

    // rafflePrice gas
    const price = parseEther('0.0001').mul(config?.raffleSalePrice).mul(mintAmount)

    // sekiraRaffleSaleMint
    cherryContract
      ?.sekiraRaffleSaleMint(mintAmount, v, r, s, { value: price })
      .then(async (result: TransactionResponse) => {
        const { wait, hash } = result
        setModal({
          minting: true,
          mintErrorMessage,
          minthash: hash,
        })
        ReactGA.event({
          category: 'Mint',
          action: 'raffle Mint w/ Send',
          label: [account, mintAmount].join('/'),
        })
        if (wait) {
          await wait()
            .then((res: any) => {
              const { transactionHash, status } = res
              if (status === 1) {
                addPopup(
                  {
                    txn: {
                      hash: transactionHash,
                      success: true,
                      summary: t`Transaction confirmed`,
                    },
                  },
                  transactionHash,
                  DEFAULT_TXN_DISMISS_MS
                )
              } else {
                addPopup(
                  {
                    txn: {
                      hash: transactionHash,
                      success: false,
                      summary: t`Transaction failed`,
                    },
                  },
                  transactionHash,
                  L2_TXN_DISMISS_MS
                )
              }
            })
            .finally(() => getRafSaleMinted())
        }
      })
      .catch((err: any) => {
        setModal({
          minting: true,
          minthash,
          mintErrorMessage: err.message,
        })
      })
    // eslint-disable-next-line
  }, [account, mintAmount, v, r, s, cherryContract, config, addPopup, getRafSaleMinted])

  useEffect(() => {
    if (!showSwitchAMainnet) {
      if (type === 'presale') {
        getPreSaleMinted()
      } else if (type === 'raffle') {
        getRafSaleMinted()
      }
    }
    return () => {
      setMintNum(2)
    }
  }, [type, showSwitchAMainnet, getPreSaleMinted, getRafSaleMinted, getPublicSaleMinted])

  return (
    <HomeWrapper>
      <TransactionSubmissionModal
        isOpen={minting}
        hash={minthash}
        onDismiss={handleDismissSubmissionModal}
        errorMessage={mintErrorMessage}
      />
      <BannerOptionWraper>
        <MintOptionWrapper>
          <AlcoholImg src={Jun} alt="Alcohol" />
          <MintWrapper>
            <Column>
              <Text fontSize={27} color={theme.text6}>
                Minted
              </Text>
              <Row>
                <Text fontSize={53} color={theme.text5}>
                  {totalSupply ? Number(totalSupply) + config?.devReservedSupply : 0}
                </Text>
                <Text fontSize={35} color={theme.text5}>
                  {'/'}
                  {config?.maxSupply || 2000}
                </Text>
              </Row>
            </Column>
            {config?.maxSupply - config?.devReservedSupply === Number(totalSupply) ? (
              <MintButton>
                <Text fontSize={31}>SOLD OUT</Text>
              </MintButton>
            ) : (
              <>
                <MintButton
                  color={'#E7B44D'}
                  disabled={
                    !(
                      availableMint - mintNum > 0 &&
                      (config?.isRaffleSaleActive === (type === 'raffle') ||
                        config?.isPresaleActive === (type === 'presale') ||
                        config?.isPublicSaleActive)
                    )
                  }
                  onClick={() => {
                    if (type === 'raffle') {
                      raffleSaleMint()
                    } else if (type === 'presale') {
                      presaleSaleMint()
                    } else {
                      publicSaleMint()
                    }
                  }}
                >
                  <DoubleImg src={One} alt="1x" />
                  <Text fontSize={31}>MINT</Text>
                </MintButton>

                <MintButton
                  color={'#E7B44D'}
                  disabled={
                    !(
                      availableMint - mintNum > 0 &&
                      (config?.isRaffleSaleActive === (type === 'raffle') ||
                        config?.isPresaleActive === (type === 'presale') ||
                        config?.isPublicSaleActive)
                    )
                  }
                  onClick={() => {
                    if (type === 'raffle') {
                      raffleSaleMint()
                    } else if (type === 'presale') {
                      presaleSaleMint()
                    } else {
                      publicSaleMint()
                    }
                  }}
                >
                  <DoubleImg src={Two} alt="2x" />
                  <Text fontSize={31}>MINT</Text>
                </MintButton>
              </>
            )}
          </MintWrapper>
        </MintOptionWrapper>
      </BannerOptionWraper>
    </HomeWrapper>
  )
}
