<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  exclude-result-prefixes="sm">
  <xsl:output method="html" indent="yes" encoding="UTF-8" doctype-public="-//W3C//DTD HTML 4.01//EN" doctype-system="http://www.w3.org/TR/html4/strict.dtd"/>

  <!-- ============================================================
    Sitemap XSLT Stylesheet — Jaybhim Affirma
    Transforms sitemap.xml into a styled HTML page using brand
    colors and design language from globals.css
  ============================================================ -->

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Sitemap — Jaybhim Affirma</title>
        <!-- Fonts matching layout.tsx -->
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&amp;family=Merriweather:wght@300;400;700&amp;family=Rajdhani:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
        <style type="text/css">
          /* =====================================================
             RESETS &amp; BASE
             ===================================================== */
          *, *::before, *::after {
            box-sizing: border-box;
          }
          
          html {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Merriweather', Georgia, serif;
            font-size: 16px;
            line-height: 1.6;
            color: #131857;
            background: #ffffff;
          }

          /* =====================================================
             DESIGN TOKENS (from globals.css :root)
             ===================================================== */
          :root {
            --primary-blue: #131857;
            --primary-white: #ffffff;
            --destructive-red: #a50c0c;
            --medium-blue: #2a3196;
            --light-blue: #455dd6;
            --border-gray: #e5e5e5;
            --muted-blue: #4a5bbd;
            --alt-bg: #f8f8f8;
          }

          /* =====================================================
             LAYOUT
             ===================================================== */
          .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem 1rem;
          }

          /* =====================================================
             HEADER (gradient-button inspired)
             ===================================================== */
          .header {
            background: linear-gradient(135deg, 
              var(--primary-blue), 
              var(--medium-blue), 
              var(--light-blue), 
              var(--primary-blue), 
              var(--medium-blue), 
              var(--light-blue),
              var(--primary-blue)
            );
            background-size: 200% 200%;
            animation: gradient-shift 12s ease-in-out infinite;
            border-radius: 0.5rem;
            padding: 2rem;
            margin-bottom: 2rem;
            text-align: center;
            box-shadow: 
              inset 0 1px 0 0 rgba(255,255,255,0.15),
              0 4px 16px 0 rgba(19,24,87,0.3);
          }

          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }

          .header h1 {
            margin: 0;
            font-family: 'Rajdhani', sans-serif;
            font-size: 2rem;
            text-transform: uppercase;
            font-weight: 300;
            color: var(--primary-white);
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }

          .header p {
            margin: 0.5rem 0 0 0;
            font-family: 'Rajdhani', sans-serif;
            font-size: 1rem;
            font-weight: 500;
            color: rgba(255,255,255,0.85);
            letter-spacing: 0.05em;
          }

          /* =====================================================
             STATS BAR
             ===================================================== */
          .stats {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 1.5rem;
            font-family: 'Rajdhani', sans-serif;
            flex-wrap: wrap;
          }

          .stat {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background: var(--primary-white);
            border: 1px solid var(--border-gray);
            border-radius: 0.5rem;
          }

          .stat-value {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--primary-blue);
          }

          .stat-label {
            font-size: 0.875rem;
            color: var(--muted-blue);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          /* =====================================================
             TABLE CARD (glassmorphism inspired)
             ===================================================== */
          .table-card {
            background: rgba(255,255,255,0.4);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid var(--primary-blue);
            border-radius: 0.5rem;
            box-shadow: 
              inset 0 1px 0 0 rgba(255,255,255,0.6),
              inset 0 -1px 1px rgba(19,24,87,0.1),
              0 4px 16px 0 rgba(19,24,87,0.15);
            overflow: hidden;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            font-family: 'Merriweather', Georgia, serif;
          }

          thead {
            background: var(--primary-blue);
          }

          th {
            padding: 0.875rem 1rem;
            font-family: 'Rajdhani', sans-serif;
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--primary-white);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            text-align: left;
            border-bottom: 2px solid var(--medium-blue);
          }

          td {
            padding: 0.875rem 1rem;
            border-bottom: 1px solid var(--border-gray);
            vertical-align: middle;
          }

          tbody tr {
            transition: all 0.2s ease;
          }

          tbody tr:nth-child(even) {
            background: var(--alt-bg);
          }

          tbody tr:hover {
            background: rgba(19,24,87,0.04);
            box-shadow: inset 0 0 0 1px rgba(19,24,87,0.15);
          }

          tbody tr:last-child td {
            border-bottom: none;
          }

          /* =====================================================
             URL COLUMN
             ===================================================== */
          .url {
            font-family: 'Rajdhani', sans-serif;
            font-weight: 500;
          }

          .url a {
            color: var(--primary-blue);
            text-decoration: none;
            transition: color 0.2s ease;
          }

          .url a:hover {
            color: var(--light-blue);
            text-decoration: underline;
          }

          /* =====================================================
             DATE COLUMN
             ===================================================== */
          .date {
            font-size: 0.875rem;
            color: var(--muted-blue);
          }

          /* =====================================================
             FREQUENCY TAGS
             ===================================================== */
          .freq {
            display: inline-block;
            font-family: 'Rajdhani', sans-serif;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .freq-weekly {
            background: rgba(19,24,87,0.1);
            color: var(--primary-blue);
            border: 1px solid rgba(19,24,87,0.2);
          }

          .freq-monthly {
            background: rgba(42,49,150,0.08);
            color: var(--medium-blue);
            border: 1px solid rgba(42,49,150,0.15);
          }

          /* =====================================================
             PRIORITY BADGES
             ===================================================== */
          .priority {
            display: inline-block;
            font-family: 'Rajdhani', sans-serif;
            font-size: 0.75rem;
            font-weight: 700;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            min-width: 2.5rem;
            text-align: center;
          }

          .prio-high {
            background: linear-gradient(135deg, #131857, #2a3196);
            color: #ffffff;
          }

          .prio-medium {
            background: linear-gradient(135deg, #2a3196, #455dd6);
            color: #ffffff;
          }

          .prio-low {
            background: #f0f0f0;
            color: #666666;
            border: 1px solid #e0e0e0;
          }

          /* =====================================================
             ROW NUMBER
             ===================================================== */
          .row-num {
            font-family: 'Rajdhani', sans-serif;
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--muted-blue);
            width: 3rem;
          }

          /* =====================================================
             FOOTER
             ===================================================== */
          .footer {
            margin-top: 2rem;
            padding: 1.5rem;
            text-align: center;
            font-family: 'Rajdhani', sans-serif;
            font-size: 0.875rem;
            color: var(--muted-blue);
          }

          .footer a {
            color: var(--primary-blue);
            text-decoration: none;
          }

          .footer a:hover {
            text-decoration: underline;
          }

          /* =====================================================
             RESPONSIVE
             ===================================================== */
          @media (max-width: 640px) {
            .header h1 {
              font-size: 1.5rem;
            }
            
            .stats {
              flex-direction: column;
              align-items: center;
              gap: 0.75rem;
            }

            .table-card {
              overflow-x: auto;
            }

            table {
              min-width: 600px;
            }

            th, td {
              padding: 0.625rem 0.75rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <header class="header">
            <h1>Sitemap</h1>
            <p>A comprehensive list of all pages on the site.</p>
          </header>

          <!-- Stats Bar -->
          <div class="stats">
            <div class="stat">
              <span class="stat-value">
                <xsl:value-of select="count(sm:urlset/sm:url)"/>
              </span>
              <span class="stat-label">URLs</span>
            </div>
          </div>

          <!-- Table -->
          <div class="table-card">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>URL</th>
                  <th>Last Modified</th>
                  <th>Change Frequency</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sm:urlset/sm:url">
                  <xsl:sort select="sm:priority" data-type="number" order="descending"/>
                  <tr>
                    <td class="row-num">
                      <xsl:value-of select="position()"/>
                    </td>
                    <td class="url">
                      <a>
                        <xsl:attribute name="href">
                          <xsl:value-of select="sm:loc"/>
                        </xsl:attribute>
                        <xsl:value-of select="sm:loc"/>
                      </a>
                    </td>
                    <td class="date">
                      <xsl:value-of select="sm:lastmod"/>
                    </td>
                    <td>
                      <span>
                        <xsl:attribute name="class">
                          <xsl:choose>
                            <xsl:when test="sm:changefreq = 'weekly'">freq freq-weekly</xsl:when>
                            <xsl:when test="sm:changefreq = 'monthly'">freq freq-monthly</xsl:when>
                            <xsl:otherwise>freq</xsl:otherwise>
                          </xsl:choose>
                        </xsl:attribute>
                        <xsl:value-of select="sm:changefreq"/>
                      </span>
                    </td>
                    <td>
                      <span>
                        <xsl:attribute name="class">
                          <xsl:choose>
                            <xsl:when test="sm:priority = 1.0">priority prio-high</xsl:when>
                            <xsl:when test="sm:priority = 0.8">priority prio-medium</xsl:when>
                            <xsl:otherwise>priority prio-low</xsl:otherwise>
                          </xsl:choose>
                        </xsl:attribute>
                        <xsl:value-of select="sm:priority"/>
                      </span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <!-- Footer -->
          <footer class="footer">
            <p>
              Generated Dynamically — 
              <a href="/">art.sumitsute.com</a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>