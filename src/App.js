import { useEffect, useState } from "react";
import CurrencyInput from './components/CurrencyInput'
import axios from 'axios'
import Converter from './assets/converter-min-arr.webp'


const API_URL = 'https://api.apilayer.com/fixer/'
const API_KEY = '4EgPaKE4Du3ZTEgLwp16STAVTx0oOMmt'

function App() {

  const [countryCurrency, setCountryCurrency] = useState('AMD')
  const [currency1, setCurrency1] = useState(countryCurrency)
  const [currency2, setCurrency2] = useState(countryCurrency)
  const [amount1, setAmount1] = useState(1)
  const [amount2, setAmount2] = useState(1)
  const [rates, setRates] = useState([])
  const [converter, setConverter] = useState(false)

  const getGeo = async () => {
    const { data } = await axios.get('https://ipapi.co/json/')

    setCountryCurrency(data.currency)
  }

  useEffect(() => {
    getGeo()
  }, [countryCurrency])

  const fetchItems = async () => {
    const { data } = await axios.get(`${API_URL}latest?symbols=${countryCurrency},USD,RUB,CAD,EUR&base=USD`,
    {
      headers: {
        'apikey': API_KEY
      }
    })
    setRates(data.rates)
  }


  useEffect(() => {
    fetchItems()
  }, [])



  function format(number) {
    return number.toFixed(2)
  }

  const handleAmount1Change = (amount1) => {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]))
    setAmount1(amount1)
  }

  const handleCurrency1Change = (currency1) => {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]))
    setCurrency1(currency1)
  }

  const handleAmount2Change = (amount2) => {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }

  const handleCurrency2Change = (currency2) => {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }


  return (
    <div className="App">
       {
        rates ?  
        <div className="onner">
          <CurrencyInput
          currencies={Object.keys(rates)}
          amount={converter ? amount1 : amount2}
          currency={converter ? currency1 : currency2}
          onAmountChange={handleAmount1Change}
          onCurrencyChange={handleCurrency1Change}
          text={'меняю'}
          />
          <div className="converter-size">
            <img onClick={() => setConverter(!converter)} src={Converter} />
          </div>
          <CurrencyInput
            currencies={Object.keys(rates)}
            amount={converter ? amount2 : amount1}
            currency={converter ? currency2 : currency1}
            onAmountChange={handleAmount2Change}
            onCurrencyChange={handleCurrency2Change}
            text={'получаю'}
          />
        </div> : ''
       }
    </div>
  );
}

export default App;
