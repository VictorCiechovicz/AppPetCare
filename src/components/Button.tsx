import { Button as ButtonNative, IButtonProps, Heading } from 'native-base'

type Props = IButtonProps & {
  title: string
}

export function Button({ title, ...rest }: Props) {
  return (
    <ButtonNative
      bg="primary.700"
      h={50}
      fontSize="sm"
      rounded={20}
      borderRadius="50px"
      _pressed={{ bg: 'secundary.700' }}
      {...rest}
    >
      <Heading color="white" fontSize="sm">
        {title}
      </Heading>
    </ButtonNative>
  )
}
