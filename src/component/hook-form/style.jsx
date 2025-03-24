import styled from '@emotion/styled'

/**
 * AntD Styled components
 */
export const AntDSDatePickerWrapper = styled.div`
 .date-picker-label {
  font-family: 'Yantramanav', sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 4px;
 }

 .ant-picker {
  input {
   font-family: 'Yantramanav', sans-serif;
   font-size: 16px;
   font-weight: 500;

   &::placeholder {
    font-family: 'Yantramanav', sans-serif;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 700;
    color: #919eab;
   }
  }

  &-dropdown {
   background-color: #d3d3d3;

   .ant-picker-cell {
    font-family: 'Your-Font-Family', sans-serif;
    background-color: #f3f4f6;
   }
  }
 }
`
