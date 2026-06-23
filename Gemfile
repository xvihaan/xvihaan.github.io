source "https://rubygems.org"

# Jekyll + Minimal Mistakes 테마 (gem).
# 로컬의 _layouts/_includes/_sass 가 존재하면 그 파일들이 gem 보다 우선 적용된다(override).
gem "jekyll", "~> 4.3"
gem "minimal-mistakes-jekyll", "~> 4.24"

# _config.yml 의 plugins / whitelist 와 일치
group :jekyll_plugins do
  gem "jekyll-paginate"
  gem "jekyll-sitemap"
  gem "jekyll-gist"
  gem "jekyll-feed"
  gem "jekyll-include-cache"
end

# Ruby 3+ 에서 `jekyll serve` 로컬 미리보기에 필요
gem "webrick", "~> 1.8"
