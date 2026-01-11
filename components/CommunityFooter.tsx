export default function CommunityFooter() {
  return (
    <footer className="mt-12 py-10 border-t border-walawow-purple/20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <div className="text-sm text-walawow-neutral-text-secondary inline-flex items-center gap-2">
          <img
            src="/walawow-logo.png"
            alt="Walawow"
            className="h-15 w-15 animate-float"
          />
          Join the community
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
          <a
            href="https://x.com/walawow"
            className="inline-flex items-center text-walawow-neutral-text-secondary hover:text-walawow-purple-light transition-colors"
            target="_blank"
            rel="noreferrer"
            aria-label="X (Twitter)"
            title="X (Twitter)"
          >
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.3 3h3.7l-8.1 9.3L22 21h-6.9l-5.4-6.2L4 21H.3l8.6-9.9L2 3h7.1l4.9 5.6L17.3 3Zm-1.3 15.8h1.7L8.1 5.9H6.3L16 18.8Z" />
            </svg>
          </a>
          <a
            href="https://t.me/Walawow"
            className="inline-flex items-center text-walawow-neutral-text-secondary hover:text-walawow-purple-light transition-colors"
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
            title="Telegram"
          >
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.8 15.8 9.4 20c.6 0 .9-.3 1.3-.6l3.1-3 6.4 4.7c1.2.7 2 .3 2.3-1.1L24 2.5c.4-1.7-.6-2.4-1.7-2L1 9.2c-1.6.6-1.6 1.5-.3 1.9l5.4 1.7L19.1 5.3c.6-.4 1.1-.2.7.2L9.8 15.8Z" />
            </svg>
          </a>
          <a
            href="https://discord.gg/walawow.fun"
            className="inline-flex items-center text-walawow-neutral-text-secondary hover:text-walawow-purple-light transition-colors"
            target="_blank"
            rel="noreferrer"
            aria-label="Discord"
            title="Discord"
          >
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.5 5.2c-1.4-.7-2.9-1.2-4.4-1.4l-.2.4c1 .2 2 .5 2.9 1-1.1-.5-2.3-.8-3.6-1-1.2-.2-2.4-.2-3.6 0-1.2.2-2.5.5-3.6 1 1-.5 1.9-.8 2.9-1l-.2-.4c-1.5.2-3 .7-4.4 1.4C2.6 9 1.9 12.8 2.3 16.6c1.6 1.2 3.2 1.9 4.8 2.3l.6-1c-.9-.3-1.8-.7-2.5-1.3.2.1.3.2.5.3 4.8 2.2 10.6 2.2 15.4 0 .2-.1.3-.2.5-.3-.7.6-1.6 1-2.5 1.3l.6 1c1.6-.4 3.2-1.1 4.8-2.3.5-3.8-.2-7.6-2.5-11.4ZM9 14.5c-.8 0-1.4-.7-1.4-1.6s.6-1.6 1.4-1.6c.8 0 1.4.7 1.4 1.6S9.8 14.5 9 14.5Zm6 0c-.8 0-1.4-.7-1.4-1.6s.6-1.6 1.4-1.6c.8 0 1.4.7 1.4 1.6s-.6 1.6-1.4 1.6Z" />
            </svg>
          </a>
          <a
            href="https://github.com/walawow"
            className="inline-flex items-center text-walawow-neutral-text-secondary hover:text-walawow-purple-light transition-colors"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.4.5 0 5.9 0 12.6c0 5.3 3.4 9.7 8.2 11.3.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.9 0 2.3-.4.1-.8.4-1.4.7-1.7-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0C17.7 4.8 18.7 5 18.7 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.6-2.7 5.6-5.3 5.9.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6 4.8-1.6 8.2-6 8.2-11.3C24 5.9 18.6.5 12 .5Z" />
            </svg>
          </a>
          <a
            href="mailto:hello@walawow.fun"
            className="inline-flex items-center text-walawow-neutral-text-secondary hover:text-walawow-purple-light transition-colors"
            aria-label="Email"
            title="Email"
          >
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 5.5C2 4.7 2.7 4 3.5 4h17c.8 0 1.5.7 1.5 1.5v13c0 .8-.7 1.5-1.5 1.5h-17C2.7 20 2 19.3 2 18.5v-13Zm2.3.5 7.7 5.2 7.7-5.2H4.3Zm15.2 12.5V8.4l-7.2 4.9c-.2.1-.5.1-.7 0L4.4 8.4v10.1h15.1Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
