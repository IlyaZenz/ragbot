from PyPDF2 import PdfReader
from docx import Document

def read_pdf(file_path):
  reader = PdfReader(file_path)
  text = ""
  for page in reader.pages:
    text+= page.extract_text()+"\n"
  return text

def read_docx(file_path):
    doc = Document(file_path)
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text