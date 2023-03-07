import { ReactNode } from 'react'
import { Text } from 'rebass'
import { TYPE } from 'theme'
import { ButtonPrimary } from 'components/Button'
import { AutoColumn } from 'components/Column'
import Modal from 'components/Modal'
import { LoadingView, SubmittedView } from 'components/ModalViews'
import { Trans } from '@lingui/macro'
import { TransactionErrorContent } from 'components/TransactionConfirmationModal'

const TransactionSubmissionModal = ({
  onDismiss,
  isOpen,
  hash,
  errorMessage,
  inline,
}: {
  onDismiss: () => void
  isOpen: boolean
  hash: string | undefined
  inline?: boolean // not in modal
  errorMessage?: ReactNode | undefined
}) => {
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
            <ButtonPrimary onClick={onDismiss} style={{ margin: '20px 0 0 0' }}>
              <Text fontWeight={500} fontSize={20}>
                {inline ? <Trans>Return</Trans> : <Trans>Close</Trans>}
              </Text>
            </ButtonPrimary>
          </AutoColumn>
        </SubmittedView>
      )}
    </Modal>
  )
}
export default TransactionSubmissionModal
