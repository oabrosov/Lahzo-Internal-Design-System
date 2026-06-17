import type { SVGProps } from 'react';

export interface LogoProps extends SVGProps<SVGSVGElement> {
  /** Accessible label for the logo. */
  title?: string;
}

/**
 * Lahzo wordmark. Uses `currentColor`, so it follows the surrounding text color
 * — set it via a `text-*` class (e.g. `text-base-content`) to theme it.
 */
export function LahzoWordmark({ title = 'Lahzo', ...props }: LogoProps) {
  return (
    <svg
      width="78"
      height="16"
      viewBox="0 0 78 16"
      fill="none"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#lahzo-wordmark-clip)" fill="currentColor">
        <path d="M60.3691 5.55305H54.3107L46.3483 11.8403V15.6641H60.4395V11.6238H52.8557L60.3691 5.55305Z" />
        <path d="M69.8015 0C64.223 0 61.6029 3.5819 61.6029 8C61.6029 12.4181 64.223 16 69.8015 16C75.38 16 78 12.4181 78 8C78 3.5819 75.38 0 69.8015 0ZM69.814 12.079C67.0457 12.079 66.2651 10.2636 66.2651 8.02371C66.2651 5.78384 67.0457 3.96839 69.814 3.96839C72.5823 3.96839 73.363 5.78384 73.363 8.02371C73.363 10.2636 72.5823 12.079 69.814 12.079Z" />
        <path d="M19.1076 9.01166L20.5709 4.52954L21.6389 7.83403H26.2675L23.4992 0.335902H17.7565L12.0708 15.6641H16.9348L17.976 12.4766H23.1382L24.1685 15.6641H29.1581L26.7022 9.01166H19.1076Z" />
        <path d="M4.66298 0.335902H0V10.4469H4.66298V0.335902Z" />
        <path d="M34.9661 11.25H30.3031V15.6641H34.9661V11.25Z" />
        <path d="M44.9479 0.335902H40.2849V4.85438H44.9479V0.335902Z" />
        <path d="M0 11.6238V15.6641H11.1905V11.6238H0Z" />
        <path d="M34.9653 6.03201V0.335902H30.3031V10.0723H40.2849V15.6641H44.9479V6.03201H34.9653Z" />
        <path d="M60.8767 0.335902H46.3483V4.37621H60.8767V0.335902Z" />
      </g>
      <defs>
        <clipPath id="lahzo-wordmark-clip">
          <rect width="78" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
