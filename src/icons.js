export function getIngredientIconSVG(type) {
      switch (type) {
        case 'bean':
          return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <ellipse cx="12" cy="12" rx="6.5" ry="9" transform="rotate(-25 12 12)" fill="#7A3617"/>
            <path d="M9.5 5.5C13 10 11 14 14.5 18.5" stroke="#231008" stroke-width="1.8" stroke-linecap="round"/>
          </svg>`;
        case 'ice':
          return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="5" width="14" height="14" rx="3.5" transform="rotate(12 12 12)" fill="#4EA8DE" stroke="#FFFFFF" stroke-width="1.5"/>
          </svg>`;
        case 'water':
          return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M12 4C12 4 6.5 11 6.5 15C6.5 18.04 8.96 20.5 12 20.5C15.04 20.5 17.5 18.04 17.5 15C17.5 11 12 4 12 4Z" fill="#219EBC"/>
          </svg>`;
        case 'milk':
        case 'foam':
          return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="7" fill="#FFFDF9" stroke="#C89B64" stroke-width="1.5"/>
            <path d="M8 13C9.5 11 14.5 11 16 13" stroke="#C89B64" stroke-width="1.5" stroke-linecap="round"/>
          </svg>`;
        case 'cocoa':
        case 'dust':
          return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="7" fill="#5C2612"/>
            <circle cx="10" cy="10" r="1.5" fill="#D49B6A"/>
          </svg>`;
        case 'matcha':
          return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M6 17C6 10 12 5 18 6C18 12 13 18 6 17Z" fill="#528934"/>
          </svg>`;
        default:
          return `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="6.5" stroke="#5A3E2B" stroke-width="1.8" stroke-dasharray="2 2"/>
          </svg>`;
      }
    }

    