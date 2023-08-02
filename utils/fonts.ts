import { Inter, Raleway } from 'next/font/google' 

const inter = Inter({ subsets: ['latin'] })
const raleway = Raleway({
    weight: [  '400' , '500' , '600'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
  }) 

export {inter, raleway}