import { Button as ButtonNative, IButtonProps, Heading } from 'native-base'

type Props = IButtonProps & {
  title: string
}

export function Button({ title, ...rest }: Props) {
  return (
    <ButtonNative
      bg="yellow.600"
      h={14}
      fontSize="sm"
      rounded="sm"
      _pressed={{ bg: 'yellow.500' }}
      {...rest}
    >
      <Heading color="white" fontSize="sm">
        {title}
      </Heading>
    </ButtonNative>
  )
}
