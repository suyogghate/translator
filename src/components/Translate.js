import React from 'react';
import axios from 'axios';
import {
    Form,
    TextArea,
    Button,
    Icon
} from 'semantic-ui-react';

export default function Translate() {
    const [inputText, setInputText] = React.useState('');
    const [detectLanguageKey, setdetectedLanguageKey] = React.useState('');
    const [languageList, setLanguageList] = React.useState([]);

    React.useEffect(() => {
      axios.get('https://libretranslate.de/languages')
      .then((response) => {
        setLanguageList(response.data)
      })
    }, [])
    

    const getLanguageSource = () => {
        axios.post('https://libretranslate.de/detect', {
            q: inputText
        })
        .then((response) => {
            setdetectedLanguageKey(response.data[0].language);
        })
    }

    return (
        <div>
            <div className="app-header">
                <h2 className="header">Texty Translator</h2>
            </div>

            <div className="app-body">
                <div>
                    <Form>
                        <Form.Field control={TextArea} placeholder='Type Text to Translate...' onChange={(e) => setInputText(e.target.value)}/>
                        <select className='language-select'>
                            <option>Please Select Language...</option>
                            {languageList.map((language) => {
                                return (
                                    <option value={language.code}>{language.name}</option>
                                )
                            })}
                        </select>
                        <Form.Field control={TextArea} placeholder='Your Result Translation...'/>
                        <Button color='orange' size='large' onClick={getLanguageSource}><Icon name='translate'/>Translate</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}