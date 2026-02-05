export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>SaaS Template</h1>
      <p>Welcome to your new SaaS project.</p>

      <section style={{ marginTop: '2rem' }}>
        <h2>Getting Started</h2>
        <ol style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Write your PRD in <code>docs/project-plan.md</code></li>
          <li>Run <code>/setup-issues</code> to generate GitHub issues</li>
          <li>Run <code>/lane a</code> to start building</li>
        </ol>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Test Commands</h2>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><code>npm run test</code> - Run unit tests</li>
          <li><code>npm run test:coverage</code> - Run with coverage</li>
          <li><code>npm run test:e2e</code> - Run E2E tests</li>
          <li><code>npm run verify</code> - Run all checks</li>
        </ul>
      </section>
    </main>
  );
}
