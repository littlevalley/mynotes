# 这里我用的emcasclient, 没有用emacs. 因为我的emacs是以server方式启动的
EMACS:=emacsclient

BASE_DIR:=/home/paul/mynotes/notes
INDEX_FILE_NAME:=index.org
INDEX_FILE_PATH:=$(BASE_DIR)/$(INDEX_FILE_NAME)
ABOUT_FILE_PATH:=$(BASE_DIR)/about.org
INBOX_FILE_PATH:=$(BASE_DIR)/inbox.org
INBOX_DIR:=$(BASE_DIR)/../inbox 
COLUMN_NUM:=$(shell expr `( echo $(BASE_DIR) | grep -o '/' | wc -l)` + 2 ) 
# 导出org文件的配置 
ORG_CONFIG_FILE:=~/mynotes/publish-config.el

EMACS_OPTS:=--eval "(load-file \"$(ORG_CONFIG_FILE)\")"

# 导出的位置, 这个位置其实是在 public-config.el 中配置的, 
# 这里的定义这个变量的作用是为了删除(make clean), 以及上传server(make upload)
OUTPUT_DIR:=~/mynotes/publish
LOCAL_URL_PREFIX:=file:///home/paul
REMOTE_URL_PREFIX:=https://littlevalley.github.io
.PHONY:index clean upload

all: html


html: clean index inbox
	@echo "Generating HTML..."
	@mkdir -p $(OUTPUT_DIR)
	@$(EMACS) $(EMACS_OPTS)
	@echo "HTML generation done"

inbox:clean
	@echo "#+TITLE:收集" >> $(INBOX_FILE_PATH)
	@echo "#+options: h:2 num:t toc:t"  >> $(INBOX_FILE_PATH)
	@echo "#+options: html-postamble:nil"  >> $(INBOX_FILE_PATH)
	@echo "#+language:zh-CN" >> $(INBOX_FILE_PATH)
	@find $(INBOX_DIR) -maxdepth 1 -type f -name "*.htm*"| while read line; \
		do \
			if [ "`echo \"$$line\"| grep '\['`" != ""  -o "`echo \"$$line\" | grep '\]'`" != "" ]; then \
			new_line=`echo $$line | sed 's/\[/【/g' `; \
			new_line=`echo $$new_line | sed 's/\]/】/g' `; \
			mv "$$line" "$$new_line"; \
			line=$$new_line ; \
			fi; \
			relative_path=".$${line#*$(BASE_DIR)}"; \
		html_file="$${relative_path##*/}";\
		html_file="$${html_file%.*}";\
		echo "- [[$$relative_path][$$html_file]]">> $(INBOX_FILE_PATH); \
		done

index:
	@echo "#+TITLE:笔记" >> $(INDEX_FILE_PATH)
	@echo "#+options: h:2 num:t toc:t"  >> $(INDEX_FILE_PATH)
	@echo "#+options: html-postamble:nil"  >> $(INDEX_FILE_PATH)
	@echo "#+language:zh-CN" >> $(INDEX_FILE_PATH)
	@find $(BASE_DIR) -type f -name "*.org"  | while read line ;  \
		do \
		if [ "$$line" = "$(INDEX_FILE_PATH)" ]; then continue ; fi; \
		if [ "$$line" = "$(ABOUT_FILE_PATH)" ]; then continue ; fi; \
		if [ "$$line" = "$(INBOX_FILE_PATH)" ]; then continue ; fi; \
		if [ "`echo \"$$line\"| grep '\['`" != ""  -o "`echo \"$$line\" | grep '\]'`" != "" ]; then \
			new_line=`echo $$line | sed 's/\[/【/g' `; \
			new_line=`echo $$new_line | sed 's/\]/】/g' `; \
			mv "$$line" "$$new_line"; \
			line=$$new_line ; \
			fi; \
		cat_l1=`echo $$line | cut -d"/" -f $(COLUMN_NUM) | cut -d"-" -f 2- `; \
		cat_l2=`echo $$line | cut -d"/" -f \`expr $(COLUMN_NUM) + 1 \` | cut -d"-" -f 2- `; \
		cat_l3=`echo $$line | cut -d"/" -f \`expr $(COLUMN_NUM) + 2 \` | cut -d"-" -f 2- `; \
		org_file=`echo $$line | cut -d"/" -f 9- `; \
		if [ "$$cat_l2" = "" ]; then  unset cat_l1 ; fi; \
		if [ "$$cat_l3" = "" ]; then  unset cat_l2 ; fi; \
		if [ "$$org_file" = "" ] ; then  unset cat_l3 ; fi; \
		if [ "$$h1" = "" -o "$$h1" != "$$cat_l1" ]; then  echo "* $$cat_l1 " >> $(INDEX_FILE_PATH) ; h1=$$cat_l1;  fi; \
		if [ "$$cat_l2" != "" ]; then { if [  "$$h2" = "" -o "$$h2" !=  "$$cat_l2"  ]; then  echo "** $$cat_l2 " >> $(INDEX_FILE_PATH) ; h2=$$cat_l2; fi; } fi; \
		if [ "$$cat_l3" != "" ]; then { if [  "$$h3" = "" -o "$$h3" !=  "$$cat_l3"  ]; then  echo "*** $$cat_l3 " >> $(INDEX_FILE_PATH) ; h3=$$cat_l3; fi; } fi; \
		relative_path=".$${line#*$(BASE_DIR)}"; \
		org_file="$${line##*/}";\
		org_file="$${org_file%.*}";\
		echo "- [[$$relative_path][$$org_file]]">> $(INDEX_FILE_PATH); \
		done

upload:
	grep -rl "$(LOCAL_URL_PREFIX)" "$(OUTPUT_DIR)" | while read line; \
	do \
	sed -i "s#$(LOCAL_URL_PREFIX)#$(REMOTE_URL_PREFIX)#g"  "$$line"; \
	done ;
	git add .
	git commit -m "update"
	git push origin master

clean:
	@rm -rf $(INDEX_FILE_PATH) @rm -rf $(INBOX_FILE_PATH)
	@rm -rf $(OUTPUT_DIR)
	@rm -rf ~/.org-timestamps
