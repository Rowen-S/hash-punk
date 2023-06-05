import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'
import walletDeActive from '../../assets/img/wallet_deactive.png'
//  Wallet DeActive
const UnWalletWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin: 8rem auto;
  img {
    width: 4.25rem;
    height: 4.25rem;
  }
  p {
    font-family: AvenirNext-Medium, AvenirNext, sans-serif;
    margin: 1.94rem 0;
    font-size: 1.5rem;
    font-weight: 500;
    color: #ffffff;
    line-height: 2.06rem;
  }
`
export default function WalletUnLock() {
  return (
    <UnWalletWrapper>
      <img src={walletDeActive} alt="" />
      <p>
        <Trans>PLEASE CONNECT YOUR WALLET</Trans>
      </p>
    </UnWalletWrapper>
  )
}
