const Spinner = () => {
  return (
    <div className=" fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div
        className="inline-block h-32 w-32 animate-spin rounded-full border-8 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      />
    </div>
  )
}

export {Spinner}
