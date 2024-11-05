'use client';

export { ThemeProvider } from '@material-tailwind/react';

// 서버 컴포넌트인 layout.tsx 파일에서 클라이언트에서 사용할 수 있는 ThemeProvider를 사용하면 에러발생
// 이를 해결하기 위해 클라이언트 컴포넌트에서 ThemeProvider를 export해준다.
