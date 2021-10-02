;;; PUBLISH-CONFIG --- publish-config
;;
;; Author: Wu Peng <paul.w86!foxmail.com>
;; Copyright © 2021, Wu Peng, all rights reserved.
;; Created: 22 September 2021
;;
;;; License:
;;
;; This program is free software: you can redistribute it and/or modify
;; it under the terms of the GNU Lesser General Public License as published by
;; the Free Software Foundation, either version 3 of the License, or (at your
;; option) any later version.
;;
;; This program is distributed in the hope that it will be useful, but WITHOUT
;; ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
;; FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more
;; details.
;;
;; You should have received a copy of the GNU Lesser General Public License along
;; with this program.  If not, see <http://www.gnu.org/licenses/>.
;;
;;; Commentary:
;;
;;; Code:

;; config for publish site from org files
(add-to-list 'load-path "~/.emacs.d/elpa/htmlize-20180923.1829")
(require 'ox-publish)    ;C-x C-e to load org-publish
(setq org-html-htmlize-output-type 'css)
(setq org-html-preamble-format '(("zh-CN"  "<div class=\"site_header\"><div class=\"site_title\" ><div class=\"title_main\">WuPeng's Notes - 我的知识库</div><div class=\"title_sub\">不积跬步，无以至千里；不积小流，无以成江海</div><div class=\"search\"></div></div><div class=\"nav_bar\"><ul><li><a href=\"file:///home/paul/mynotes/publish/index.html\">笔记</a></li><li><a href=\"file:///home/paul/mynotes/publish/inbox.html\">收集</a></li><li><a href=\"#contact\">Contact</a></li><li style=\"float:right\"><a href=\"file:///home/paul/mynotes/publish/about.html\">关于</a></li></ul></div></div>")))

(setq org-html-head-include-default-style nil)
         :org-html-head-include-default-style nil
(setq org-publish-project-alist
      '(
        ;; These are the main web files
        ("org-notes"
         :base-directory "~/mynotes/notes/" ;; Change this to your local dir
         :base-extension "org"
         :publishing-directory "~/mynotes/publish"
         :recursive t
         :publishing-function org-html-publish-to-html
         :html-link-org-files-as-html  org-html-link-org-files-as-html
         :headline-levels 2             ; Just the default for this project.
         :section-numbers t
         :language "zh-CN"
         :html-head "<link rel='stylesheet' type='text/css' href='file:///home/paul/mynotes/publish/css/org.css' /><link rel='stylesheet' type='text/css' href='file:///home/paul/mynotes/publish/css/header.css' />"
         :html-postamble nil
         :auto-sitemap  nil               ; Generate sitemap.org automagically...
         ;; :sitemap-filename "sitemap.org"  ; ... call it sitemap.org (it's the default)...
         ;; :sitemap-title "Sitemap"         ; ... with title 'Sitemap'.
         ;; :sitemap-sort-files anti-chronologically
         ;; :sitemap-file-entry-format "%d %t"
         )

        ;; These are static files (images, pdf, etc)
        ("org-static"
         :base-directory "~/mynotes/static/" ;; Change this to your local dir
         :base-extension "css\\|js\\|png\\|jpg\\|gif\\|pdf\\|mp3\\|ogg\\|swf\\|txt\\|asc"
         :publishing-directory "~/mynotes/publish"
         :recursive t
         :publishing-function org-publish-attachment
         )

        ("org" :components ("org-notes" "org-static"))
        )
      )

(defun myweb-publish nil
  "Publish myweb."
  (interactive)
  (org-publish-all))

(myweb-publish)

;;; publish-config.el ends here
