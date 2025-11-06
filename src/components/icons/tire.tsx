import type { SVGProps } from 'react';

export function TireIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M6.34 2.16 17.66 13.48" />
      <path d="m5.16 6.34 11.32 11.32" />
      <path d="m2.16 11.66 11.32 11.32" />
      <path d="m2.16 6.34 11.32 11.32" />
    </svg>
  );
}
