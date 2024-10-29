import { StyledRootDiv, LoaderContainer, MainBeam, AnimatedFill, BeamsContainer, VerticalBeam, DiagonalBeam } from './style'

const FramingLoader = () => {
 return (
  <StyledRootDiv>
   <LoaderContainer>
    <MainBeam>
     <AnimatedFill />
    </MainBeam>

    <BeamsContainer>
     {[...Array(8)].map((_, index) => (
      <VerticalBeam key={`vertical-top-${index}`} index={index} />
     ))}
    </BeamsContainer>

    <BeamsContainer>
     {[...Array(7)].map((_, index) => (
      <DiagonalBeam key={`diagonal-top-${index}`} index={index} />
     ))}
    </BeamsContainer>

    <MainBeam bottom>
     <AnimatedFill />
    </MainBeam>

    <BeamsContainer bottom>
     {[...Array(8)].map((_, index) => (
      <VerticalBeam key={`vertical-bottom-${index}`} index={index} bottom />
     ))}
    </BeamsContainer>

    <BeamsContainer bottom>
     {[...Array(7)].map((_, index) => (
      <DiagonalBeam key={`diagonal-bottom-${index}`} index={index} bottom />
     ))}
    </BeamsContainer>
   </LoaderContainer>
  </StyledRootDiv>
 )
}

export default FramingLoader
