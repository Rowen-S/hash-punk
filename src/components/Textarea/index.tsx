import { ReactNode } from 'react'
import styled from 'styled-components/macro'
import { Text } from 'rebass'
import { ResizingTextArea } from 'components/TextInput'
import { Trans } from '@lingui/macro'
import { AutoColumn } from '../Column'

const TextAreaHeader = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text2};
`

const TextAreaContainer = styled.div`
  margin-top: 10px;
  padding: 0.75rem 1rem 0.75rem 1rem;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`

export default function TextArea({
  className,
  label,
  placeholder,
  value,
  onChange,
}: {
  className?: string
  label?: ReactNode
  placeholder?: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <TextAreaContainer className={className}>
      <AutoColumn gap="md">
        <TextAreaHeader>
          <Trans>{label}</Trans>
        </TextAreaHeader>
        <ResizingTextArea value={value} onUserInput={onChange} placeholder={placeholder} fontSize="1rem" />
      </AutoColumn>
    </TextAreaContainer>
  )
}
