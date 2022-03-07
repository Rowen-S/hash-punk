import { ReactNode, useContext } from 'react'
import { ThemeContext } from 'styled-components/macro'
import { Text } from 'rebass'
import { ExternalLink, TYPE } from 'theme'
import { ButtonPrimary } from 'components/Button'
import { AutoColumn } from 'components/Column'
import Modal from 'components/Modal'
import { LoadingView, SubmittedView } from 'components/ModalViews'
import { Link } from 'react-router-dom'
import { Trans } from '@lingui/macro'
import { TransactionErrorContent } from 'components/TransactionConfirmationModal'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'

const TransactionSubmissionModal = ({
  isOpen,
  hash,
  errorMessage,
  onDismiss,
}: {
  isOpen: boolean
  hash: string | undefined
  errorMessage?: ReactNode | undefined
  onDismiss: () => void
}) => {
  const theme = useContext(ThemeContext)
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      {!hash ? (
        errorMessage ? (
          <TransactionErrorContent onDismiss={onDismiss} message={errorMessage} />
        ) : (
          <LoadingView onDismiss={onDismiss}>
            <AutoColumn gap="12px" justify={'center'}>
              <TYPE.largeHeader>
                <Trans>Submitting Transaction</Trans>
              </TYPE.largeHeader>
            </AutoColumn>
          </LoadingView>
        )
      ) : (
        <SubmittedView onDismiss={onDismiss} hash={hash}>
          <AutoColumn gap="12px" justify={'center'}>
            <Text fontWeight={500} fontSize={20} textAlign="center">
              <Trans>Transaction Submitted</Trans>
            </Text>
            {hash && (
              <ExternalLink href={getExplorerLink(1, hash, ExplorerDataType.TRANSACTION)}>
                <Text fontWeight={500} fontSize={14} color={theme.primary1}>
                  <Trans>View on Etherscan</Trans>
                </Text>
              </ExternalLink>
            )}
            <ButtonPrimary as={Link} to="/" onClick={onDismiss} style={{ margin: '20px 0 0 0' }}>
              <Text fontWeight={500} fontSize={20}>
                <Trans>Return</Trans>
              </Text>
            </ButtonPrimary>
          </AutoColumn>
        </SubmittedView>
      )}
    </Modal>
  )
}
export default TransactionSubmissionModal
