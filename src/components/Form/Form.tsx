import './Form.css'
import { Send } from 'lucide-react'
import { useState } from 'react'

interface FormProps {
  onSubmit: (url: string, question: string) => void
}

export function Form({ onSubmit }: FormProps) {
  const [url, setUrl] = useState('')
  const [question, setQuestion] = useState('')

  const handleSubmit = () => {
    if (!url.trim() || !question.trim()) return
    onSubmit(url, question)
  }

  return (
    <div className='form-container'>
      <p className='title-forms'>Qual orientação você deseja dar à IA?</p>
      <div className='form-input'>
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Ex.: Melhore a escrita acadêmica, a coesão e a clareza do meu TCC sobre..."
        />
        <button onClick={handleSubmit}></button>
      </div>

      <p className='title-forms'>Qual trecho do seu texto você deseja aprimorar?</p>
      <div className='form-input'>
        <input
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Cole aqui o trecho do seu texto..."
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />
        <button onClick={handleSubmit}><Send /></button>
      </div>
    </div>
  )
}