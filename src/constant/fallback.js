import HTTP_CODE from './http-code'

const FALLBACK = {
  // fallback
  NOT_FOUND: {
    code: HTTP_CODE.NOT_FOUND,
    title: 'Ooppps... page not found',
    message: "Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL? Be sure to check your spelling"
  },
  FORBIDDEN: {
    code: HTTP_CODE.FORBIDDEN,
    title: "You're not authorized to access this page",
    message:
      "This server is aware of the request, but denies access due to insufficient permissions. This indicates that you don't possess the required authorization to view the requested page or resource. Contact the system Administrator."
  },
  INTERNAL_SERVER_ERROR: {
    code: HTTP_CODE.INTERNAL_SERVER_ERROR,
    title: 'Ooppps... server error',
    message: 'Sorry, something went wrong. Please try again later'
  },
  UNDER_DEVELOPMENT: {
    code: HTTP_CODE.UNDER_DEVELOPMENT,
    title: 'Under Development',
    message: 'This feature is under development. Please check back later'
  },
  NO_DATA: {
    code: HTTP_CODE.NO_DATA,
    title: 'No Data Found',
    description: 'The data you are looking for is not found. Try to use a different keyword.'
  },
  NO_TICKET: {
    code: HTTP_CODE.NO_DATA,
    title: 'No Ticket/s Found',
    description: 'No tickets has been issued.'
  }
}

export default FALLBACK
