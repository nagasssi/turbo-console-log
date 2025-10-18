import { DynamicFreemiumPanel } from '../types';
import { contentByType } from '../contentByType';
import { getCommonStyles } from '../styles/getCommonStyles';
import { getJavaScript } from '../javascript/javascript';

/**
 * Sanitize HTML content to remove service worker registration code
 * VS Code webviews don't support service workers
 * @param html The HTML string to sanitize
 * @returns Sanitized HTML string
 */
function sanitizeHtmlForWebview(html: string): string {
  // Remove navigator.serviceWorker.register calls and related code
  return html
    .replace(/navigator\.serviceWorker\.register\([^)]*\);?/g, '')
    .replace(/if\s*\(\s*['"]serviceWorker['"]\s+in\s+navigator\s*\)\s*{[^}]*}/g, '')
    .replace(/\/\/.*service.*worker.*\n?/gi, '');
}

/**
 * Generate dynamic HTML when dynamic content is available
 * @param dynamicContent The dynamic content to render
 * @returns Complete HTML string for dynamic content
 */
export function getDynamicHtml(dynamicContent: DynamicFreemiumPanel): string {
  // Separate content by type for different placement
  const {
    topContentHtml,
    articlesHtml,
    surveyHtml,
    tableHtml,
    mediaShowcaseCTAHtml,
  } = contentByType(dynamicContent);

  // Sanitize all HTML content to remove service worker code
  const sanitizedTopContent = sanitizeHtmlForWebview(topContentHtml);
  const sanitizedArticles = sanitizeHtmlForWebview(articlesHtml);
  const sanitizedSurvey = sanitizeHtmlForWebview(surveyHtml);
  const sanitizedTable = sanitizeHtmlForWebview(tableHtml);
  const sanitizedMediaShowcaseCTA = sanitizeHtmlForWebview(mediaShowcaseCTAHtml);

  return `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        ${getCommonStyles()}
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Dynamic Content Section -->
        ${sanitizedTopContent}
        
        <!-- Media Showcase CTA Section -->
        ${sanitizedMediaShowcaseCTA}
        
        <!-- Dynamic Survey Section -->
        ${sanitizedSurvey}
        
        <!-- Dynamic Table Section -->
        ${sanitizedTable}

        <!-- Dynamic Articles Section -->
        ${
          sanitizedArticles
            ? `
        <section class="section">
          <h3>📚 Featured Turbo Articles</h3>
          <div class="articles-grid">
            ${sanitizedArticles}
          </div>
        </section>
        `
            : ''
        }
        
        <!-- Footer -->
        <footer class="footer">
          © 2025 Turbo Console Log • Built with ❤️ by Turbo Unicorn 🦄
        </footer>
      </div>

      <script>
        ${getJavaScript()}
      </script>
    </body>
  </html>
  `;
}
