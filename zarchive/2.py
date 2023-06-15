import subprocess

def latex_to_pdf(tex_code, output_path):
    # Create a temporary .tex file
    temp_file = "temp.tex"
    with open(temp_file, "w") as file:
        file.write(tex_code)

    # Run pdflatex command
    try:
        subprocess.run(["pdflatex", "-interaction=batchmode", temp_file], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error occurred while running pdflatex: {e}")
        return

    # Move the generated PDF to the desired output path
    try:
        subprocess.run(["mv", "temp.pdf", output_path], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error occurred while moving the PDF file: {e}")
        return

    print(f"PDF successfully generated at: {output_path}")

# Example usage
latex_code = r"""
\documentclass{article}
\begin{document}
Hello, \LaTeX!
\end{document}
"""

output_file = "output.pdf"

latex_to_pdf(latex_code, output_file)
