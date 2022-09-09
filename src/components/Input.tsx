import React from 'react'
import { Input as NativeBaseInput, IInputProps } from 'native-base'

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg="primary.100"
      h={14}
      size="md"
      borderWidth={1}
      fontSize="md"
      fontFamily="body"
      color="black"
      placeholderTextColor="gray.300"
      _focus={{
        borderWidth: 1,
        borderColor: 'yellow.500',
        bg: 'primary.100'
      }}
      {...rest}
    />
  )
}
