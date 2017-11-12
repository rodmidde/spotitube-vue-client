file = Workshop

html:
	pandoc $(file).md --filter include_file.py -o $(file).html --toc --from markdown --number-sections --css ~/.local/share/pandoc.css --self-contained
