import React from 'react'
import { Input as NativeBaseInput, IInputProps } from 'native-base'

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg="white"
      h={14}
      size="md"
      borderWidth={1}
      fontSize="md"
      fontFamily="body"
      color="black"
      borderRadius={10}
      borderColor="#000"
      placeholderTextColor="gray.300"
      _focus={{
        borderWidth: 1,
        borderColor: 'primary.700',
        bg: 'primary.100'
      }}
      {...rest}
    />
  )
}
