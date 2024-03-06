function useLimitString(string, limit) {
  return string?.length > limit ? `${string?.substring(0, limit)}...` : string
}

export default useLimitString
