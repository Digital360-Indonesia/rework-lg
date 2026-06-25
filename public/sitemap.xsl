<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xhtml="http://www.w3.org/1999/xhtml">
<xsl:output method="html" indent="yes"/>

<xsl:template match="/">
	<html lang="id">
	<head>
		<meta charset="UTF-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<title>Sitemap - Level Garment</title>
		<style>
			:root {
				--bg: #fafafa;
				--surface: #ffffff;
				--border: #e5e7eb;
				--text: #1f2937;
				--text-muted: #6b7280;
				--accent: #af7ad5;
				--accent-dark: #9b5dc9;
				--accent-bg: #f3e8ff;
			}

			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}

			body {
				font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
				background: var(--bg);
				color: var(--text);
				line-height: 1.6;
				padding: 2rem 1rem;
			}

			.container {
				max-width: 900px;
				margin: 0 auto;
			}

			header {
				text-align: center;
				margin-bottom: 3rem;
				padding-bottom: 2rem;
				border-bottom: 1px solid var(--border);
			}

			h1 {
				font-size: 2rem;
				font-weight: 600;
				margin-bottom: 0.5rem;
				color: var(--accent-dark);
			}

			.subtitle {
				color: var(--text-muted);
				font-size: 0.9375rem;
			}

			.stats {
				display: flex;
				gap: 2rem;
				justify-content: center;
				margin-top: 1rem;
				flex-wrap: wrap;
			}

			.stat {
				background: var(--surface);
				padding: 0.5rem 1rem;
				border-radius: 6px;
				font-size: 0.875rem;
				border: 1px solid var(--border);
				box-shadow: 0 1px 2px rgba(0,0,0,0.05);
			}

			.stat-label {
				color: var(--text-muted);
				font-size: 0.75rem;
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}

			.stat-value {
				font-weight: 600;
				color: var(--accent-dark);
			}

			.url-list {
				display: flex;
				flex-direction: column;
				gap: 0.75rem;
			}

			.url-item, .sitemap-item {
				background: var(--surface);
				border: 1px solid var(--border);
				border-radius: 8px;
				padding: 1rem 1.25rem;
				transition: all 0.2s ease;
				box-shadow: 0 1px 2px rgba(0,0,0,0.05);
			}

			.url-item:hover, .sitemap-item:hover {
				border-color: var(--accent);
				box-shadow: 0 4px 6px rgba(0,0,0,0.1);
			}

			.url-loc, .sitemap-loc {
				font-size: 1rem;
				font-weight: 500;
				margin-bottom: 0.5rem;
			}

			.url-loc a, .sitemap-loc a {
				color: var(--accent-dark);
				text-decoration: none;
			}

			.url-loc a:hover, .sitemap-loc a:hover {
				text-decoration: underline;
			}

			.url-meta, .sitemap-meta {
				display: flex;
				gap: 1.5rem;
				flex-wrap: wrap;
				font-size: 0.8125rem;
			}

			.meta-item {
				display: flex;
				align-items: center;
				gap: 0.375rem;
			}

			.meta-label {
				color: var(--text-muted);
			}

			.meta-value {
				color: var(--text-muted);
			}

			.priority-high {
				color: #10b981;
			}

			.priority-medium {
				color: #f59e0b;
			}

			.priority-low {
				color: #6b7280;
			}

			.lang-badge {
				display: inline-block;
				padding: 0.125rem 0.5rem;
				background: var(--accent-bg);
				border-radius: 4px;
				font-size: 0.75rem;
				font-weight: 500;
				margin-left: 0.5rem;
				color: var(--accent-dark);
			}

			footer {
				text-align: center;
				margin-top: 3rem;
				padding-top: 2rem;
				border-top: 1px solid var(--border);
				color: var(--text-muted);
				font-size: 0.875rem;
			}

			footer a {
				color: var(--accent-dark);
				text-decoration: none;
			}

			footer a:hover {
				text-decoration: underline;
			}

			@media (max-width: 640px) {
				h1 {
					font-size: 1.5rem;
				}

				.stats {
					flex-direction: column;
					gap: 0.75rem;
				}

				.url-meta, .sitemap-meta {
					flex-direction: column;
					gap: 0.5rem;
				}
			}
		</style>
	</head>
	<body>
		<div class="container">
			<header>
				<h1><xsl:choose>
					<xsl:when test="//sitemap:sitemapindex">Sitemap Index</xsl:when>
					<xsl:otherwise>Sitemap</xsl:otherwise>
				</xsl:choose></h1>
				<p class="subtitle">levelgarment.com — XML Sitemap</p>
				<div class="stats">
					<xsl:choose>
						<xsl:when test="//sitemap:sitemapindex">
							<div class="stat">
								<div class="stat-label">Total Sitemaps</div>
								<div class="stat-value"><xsl:value-of select="count(//sitemap:sitemap)"/></div>
							</div>
						</xsl:when>
						<xsl:otherwise>
							<div class="stat">
								<div class="stat-label">Total URLs</div>
								<div class="stat-value"><xsl:value-of select="count(//sitemap:url)"/></div>
							</div>
							<div class="stat">
								<div class="stat-label">Languages</div>
								<div class="stat-value">ID</div>
							</div>
						</xsl:otherwise>
					</xsl:choose>
				</div>
			</header>

			<main class="url-list">
				<!-- Sitemap Index: List of sitemaps -->
				<xsl:for-each select="//sitemap:sitemap">
					<article class="sitemap-item">
						<div class="sitemap-loc">
							<a>
								<xsl:attribute name="href">
									<xsl:value-of select="sitemap:loc"/>
								</xsl:attribute>
								<xsl:choose>
									<xsl:when test="contains(sitemap:loc, 'pages')">
										📄 Pages Sitemap
									</xsl:when>
									<xsl:when test="contains(sitemap:loc, 'berita')">
										📝 Blog Sitemap
									</xsl:when>
									<xsl:when test="contains(sitemap:loc, 'portfolio')">
										🎨 Portfolio Sitemap
									</xsl:when>
									<xsl:otherwise>
										📋 <xsl:value-of select="sitemap:loc"/>
									</xsl:otherwise>
								</xsl:choose>
							</a>
						</div>
						<div class="sitemap-meta">
							<div class="meta-item">
								<span class="meta-label">Last updated:</span>
								<span class="meta-value"><xsl:value-of select="sitemap:lastmod"/></span>
							</div>
						</div>
					</article>
				</xsl:for-each>

				<!-- Regular Sitemap: List of URLs -->
				<xsl:for-each select="//sitemap:url">
					<xsl:sort select="sitemap:priority" order="descending"/>
					<xsl:sort select="sitemap:loc"/>
					<article class="url-item">
						<div class="url-loc">
							<a>
								<xsl:attribute name="href">
									<xsl:value-of select="sitemap:loc"/>
								</xsl:attribute>
								<xsl:value-of select="sitemap:loc"/>
							</a>
							<xsl:if test="contains(sitemap:loc, '/berita/')">
								<span class="lang-badge">ID</span>
							</xsl:if>
							<xsl:if test="contains(sitemap:loc, '/portfolio/')">
								<span class="lang-badge">ID</span>
							</xsl:if>
						</div>
						<div class="url-meta">
							<div class="meta-item">
								<span class="meta-label">Priority:</span>
								<span class="meta-value">
									<xsl:attribute name="class">
										meta-value
										<xsl:choose>
											<xsl:when test="sitemap:priority &gt;= 0.8"> priority-high</xsl:when>
											<xsl:when test="sitemap:priority &gt;= 0.5"> priority-medium</xsl:when>
											<xsl:otherwise> priority-low</xsl:otherwise>
										</xsl:choose>
									</xsl:attribute>
									<xsl:value-of select="sitemap:priority"/>
								</span>
							</div>
							<div class="meta-item">
								<span class="meta-label">Updated:</span>
								<span class="meta-value"><xsl:value-of select="sitemap:lastmod"/></span>
							</div>
							<div class="meta-item">
								<span class="meta-label">Change freq:</span>
								<span class="meta-value"><xsl:value-of select="sitemap:changefreq"/></span>
							</div>
						</div>
					</article>
				</xsl:for-each>
			</main>

			<footer>
				<p><a href="/">← Back to levelgarment.com</a></p>
			</footer>
		</div>
	</body>
	</html>
</xsl:template>

</xsl:stylesheet>
