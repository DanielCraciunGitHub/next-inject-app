interface WordedSeparatorProps {
  word: string
}

export const WordedSeparator = ({ word }: WordedSeparatorProps) => {
  return (
    <div className="my-4 flex items-center">
      <div className="flex-grow border-t border-muted"></div>
      <span className="mx-1 flex-shrink text-sm text-muted-foreground">
        {word}
      </span>
      <div className="flex-grow border-t border-muted"></div>
    </div>
  )
}
