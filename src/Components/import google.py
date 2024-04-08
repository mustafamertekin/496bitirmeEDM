import google.generativeai as ai

KEY = 'AIzaSyB84B5behHBqbACHSE6f1G_hEgas1xCT5Q'

AppInput = "Sagopa Kajmer - 24"

ai.configure(api_key=KEY)

model = ai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])

question = f"{AppInput} şarkısının sadece linkini gönder yanında başka yazı yazma. başlık da koyma sadece link"

response = chat.send_message(question)
geminiOutput = response.text
AppOutput = geminiOutput.split()
link = AppOutput[-1]

print('\n')
print(f"{link}\n")