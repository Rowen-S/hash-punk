import { useCallback, useContext, useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { Box, Text } from 'rebass'
import { darken } from 'polished'
import { Minus, Plus } from 'react-feather'

import { useMintContract } from 'hooks/useContract'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useAddPopup, useWalletModalToggle } from 'state/application/hooks'

import styled, { ThemeContext } from 'styled-components/macro'

import Column from 'components/Column'
import { ButtonEmpty, ButtonOutlined } from 'components/Button'
import Row from 'components/Row'
import NumericalInput from 'components/NumericalInput'
import TransactionSubmissionModal from 'components/TransactionSubmissionModal'
import { DEFAULT_TXN_DISMISS_MS, L2_TXN_DISMISS_MS } from 'constants/misc'

import { useActiveWeb3React } from 'hooks/web3'

import { defaultChainId } from 'constants/chains'

import { TransactionResponse } from '@ethersproject/providers'
//formatEther,
import { parseEther } from '@ethersproject/units'
// import { BigNumber } from '@ethersproject/bignumber'

import { get } from 'utils/request'
import { switchToNetwork } from 'utils/switchToNetwork'
import { LightGreyCard } from 'components/Card'

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
  padding: 2.875rem;
`
const MintWrapper = styled(Row)`
  width: 100%;
  margin-left: 160px;
  justify-content: space-around;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-left: unset;
    flex-direction: column;
  `};
`

const AlcoholImg = styled.img`
  position: absolute;
  width: 120px;
  height: 180px;
  bottom: 0;
  left: 3.625rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    position: unset;
    width: 100px;
    height: 160px;
  `};
`
const MintButton = styled(ButtonEmpty)<{ color?: string; open?: boolean; bg?: string }>`
  position: relative;
  width: 10.75rem;
  height: 5.3125rem;
  background-size: 100% 100%;
  color: ${({ theme }) => theme.text1};
  :disabled {
    background: ${({ theme }) => theme.bg6};
  }
`
const DoubleImg = styled.img`
  position: absolute;
  right: 0;
  top: -5px;
  width: 3.375rem;
  height: 3.25rem;
`

const MintInputWrapper = styled(Row)`
  justify-content: center;
  width: 10.75rem;
  height: 5.3125rem;
`
const MintInput = styled(NumericalInput)`
  flex: 1 1 auto;
  width: 0;
  max-width: 55px;
  max-height: 2.5rem;
  font-size: 1rem;
  padding: 5px;
  font-weight: 400;
  width: 100%;
  border-radius: 2px;
  background-color: white;
  text-align: center;
`
const Operation = styled(ButtonOutlined)`
  max-width: 50px;
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
  const showSwitchAMainnet = Boolean(chainId !== defaultChainId)
  const showAccount = Boolean(!account)

  const theme = useContext(ThemeContext)
  const addPopup = useAddPopup()
  const pangaContract = useMintContract()
  const mintedForPublic = useSingleCallResult(pangaContract, 'mintedForPublic', [account ?? undefined])?.result?.[0]
  const mintedForPresale = useSingleCallResult(pangaContract, 'mintedForPresale', [account ?? undefined])?.result?.[0]

  // currently sold
  const currently = useSingleCallResult(pangaContract, 'totalSupply')?.result?.[0]
  // total
  const total = useSingleCallResult(pangaContract, 'maxTokens')?.result?.[0]
  // maxPublicMint
  const maxPublicMint = useSingleCallResult(pangaContract, 'maxPublicMint')?.result?.[0]

  const isFreeMintActive = useSingleCallResult(pangaContract, 'isFreeMintActive')?.result?.[0]

  const isPresaleActive = useSingleCallResult(pangaContract, 'isPresaleActive')?.result?.[0]

  const isPublicActive = useSingleCallResult(pangaContract, 'isPublicActive')?.result?.[0]

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
  // mint status
  const [{ tier, proofs }, setCheckPoof] = useState<{
    tier: number | undefined
    proofs: string[] | undefined
  }>({
    tier: undefined,
    proofs: undefined,
  })

  const getCheckPoof = useCallback(async () => {
    if (account) {
      const { code, data } = await get(`https://panganft.com/apis/getAccount?address=${account.toLocaleLowerCase()}`)
      if (code == 0 && data) {
        const { tier, proofs } = data
        setTimeout(() => {
          setCheckPoof({
            tier,
            proofs,
          })
        }, 100)
      } else {
        setCheckPoof({
          tier: undefined,
          proofs: undefined,
        })
      }
    }
  }, [account, setCheckPoof])

  const handleAmountInput = useCallback(
    (value: string) => {
      value = value.replace(/\D+/, '')
      setAmount(value)
    },
    [setAmount]
  )

  const handlePlus = useCallback(
    (val: number) => {
      const totalSupply = val + 1 + Number(mintedForPublic)
      if (totalSupply <= maxPublicMint) {
        setAmount(val >= maxPublicMint ? String(val) : String(val + 1))
      }
    },
    [maxPublicMint, mintedForPublic, setAmount]
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
      const totalPrice = parseEther('0.05').mul(amount)
      pangaContract
        .mintPublicSale(amount, { value: totalPrice })
        .then(async (result: TransactionResponse) => {
          const { wait, hash } = result
          setModal({
            minting: true,
            mintErrorMessage,
            minthash: hash,
          })
          if (wait) {
            await wait().then((res: any) => {
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
          }
        })
        .catch((err: any) => {
          setModal({
            minting: true,
            minthash,
            mintErrorMessage: err.message,
          })
        })
    },
    // eslint-disable-next-line
    [pangaContract, account, addPopup, amount]
  )
  const mintPresale = useCallback(
    (proofs: string[], tier: number) => {
      setModal({
        minting: true,
        minthash,
        mintErrorMessage,
      })
      const sum = tier ? 2 : 1
      const totalPrice = tier ? parseEther('0.04').mul(sum) : parseEther('0.02').mul(sum)

      pangaContract
        ?.mintPresale(sum, tier, proofs, { value: totalPrice })
        .then(async (result: TransactionResponse) => {
          const { wait, hash } = result
          setModal({
            minting: true,
            mintErrorMessage,
            minthash: hash,
          })
          if (wait) {
            await wait().then((res: any) => {
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
          }
        })
        .catch((err: any) => {
          setModal({
            minting: true,
            minthash,
            mintErrorMessage: err.message,
          })
        })
    },
    // eslint-disable-next-line
    [pangaContract, account, addPopup, amount]
  )

  const mintFreeSale = useCallback(
    () => {
      setModal({
        minting: true,
        minthash,
        mintErrorMessage,
      })

      pangaContract
        .mintFreeSale(1)
        .then(async (result: TransactionResponse) => {
          const { wait, hash } = result
          setModal({
            minting: true,
            mintErrorMessage,
            minthash: hash,
          })
          if (wait) {
            await wait().then((res: any) => {
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
          }
        })
        .catch((err: any) => {
          setModal({
            minting: true,
            minthash,
            mintErrorMessage: err.message,
          })
        })
    },
    // eslint-disable-next-line
    [pangaContract, account, addPopup, amount]
  )

  useEffect(() => {
    if (!showSwitchAMainnet) {
      getCheckPoof()
    }
    return () => {
      setCheckPoof({
        tier: undefined,
        proofs: undefined,
      })
    }
  }, [showSwitchAMainnet, getCheckPoof])

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
          <AlcoholImg src={''} alt="Alcohol" />
          <MintWrapper>
            <Column>
              <Text fontSize={27} color={theme.text1}>
                Minted
              </Text>
              {!showAccount && !showSwitchAMainnet ? (
                <Row>
                  <Text fontSize={53} color={theme.text5}>
                    {Number(currently)}
                  </Text>
                  <Text fontSize={35} color={theme.text5}>
                    {'/'}
                    {Number(total)}
                  </Text>
                </Row>
              ) : null}
            </Column>
            {showAccount ? (
              <MintButton color={'#E7B44D'} onClick={toggleWalletModal}>
                <Text fontSize={31}>Connect</Text>
              </MintButton>
            ) : showSwitchAMainnet ? (
              <MintButton
                bg={theme.red1}
                disabled={mintedForPresale}
                onClick={() => {
                  if (!library?.provider?.request || !chainId || !library?.provider?.isMetaMask) {
                    return
                  }
                  switchToNetwork({ library, chainId: defaultChainId })
                }}
              >
                <Text fontSize={31}>Switch</Text>
              </MintButton>
            ) : isPublicActive ? (
              <>
                <MintInputWrapper>
                  <Operation
                    onClick={() => handlePlus(parseInt(amount))}
                    disabled={Number(amount) + Number(mintedForPublic) >= maxPublicMint}
                  >
                    <Plus size={18} />
                  </Operation>
                  <MintInput value={amount} disabled onUserInput={(val) => handleAmountInput(val)} placeholder="0" />
                  <Operation onClick={() => handleMinus(parseInt(amount))} disabled={Number(amount) == 1}>
                    <Minus size={18} />
                  </Operation>
                </MintInputWrapper>
                {Number(currently) > Number(total) ? (
                  <MintButton>
                    <Text fontSize={31}>SOLD OUT</Text>
                  </MintButton>
                ) : (
                  <MintButton color={'#E7B44D'} onClick={mintPublicSale}>
                    <Text fontSize={31}>MINT</Text>
                  </MintButton>
                )}
              </>
            ) : isPresaleActive ? (
              tier !== undefined && proofs !== undefined ? (
                tier === 0 ? (
                  <MintButton
                    color={'#E7B44D'}
                    disabled={mintedForPresale > 0}
                    onClick={() => mintPresale(proofs, tier)}
                  >
                    <DoubleImg src={''} alt="1x" />
                    <Text fontSize={31}>MINT</Text>
                  </MintButton>
                ) : (
                  <MintButton
                    color={'#E7B44D'}
                    disabled={mintedForPresale > 0}
                    onClick={() => mintPresale(proofs, tier)}
                  >
                    <DoubleImg src={''} alt="2x" />
                    <Text fontSize={31}>MINT</Text>
                  </MintButton>
                )
              ) : (
                <Text fontSize={31} color={theme.red1}>
                  Not qualified
                </Text>
              )
            ) : isFreeMintActive ? (
              <>
                <MintButton color={'#E7B44D'} onClick={mintFreeSale}>
                  <Text fontSize={31}>MINT</Text>
                </MintButton>
              </>
            ) : (
              <MintButton disabled>
                <Text fontSize={31}>NOT STARTED</Text>
              </MintButton>
            )}
          </MintWrapper>
        </MintOptionWrapper>
      </HomeContainer>
    </HomeWrapper>
  )
}
