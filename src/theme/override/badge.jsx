import { RADIUS } from 'config/layout'
export default function Badge(theme) {
 return {
  MuiBadge: {
   styleOverrides: {
    dot: {
     width: 10,
     height: 10,
     borderRadius: RADIUS.CHIP.borderRadius
    }
   }
  }
 }
}
