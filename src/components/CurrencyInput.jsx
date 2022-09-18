import PropTypes from 'prop-types'
import styles from './CurrencyInput.module.css'

const CurrencyInput = (props) => {
  return (
      <div>
        <span>{props.text}</span>
        <div className={styles.group}>
          <input type="number"  value={props.amount} onChange={(e) => props.onAmountChange(e.target.value)} />
          <select value={props.currency} onChange={(e) => props.onCurrencyChange(e.target.value)}>
              {props.currencies.map((currency => (
                  <option key={currency} value={currency}>{currency}</option>
              )))}
          </select>
        </div>
      </div>
  )
}


CurrencyInput.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
  text: PropTypes.string
}

export default CurrencyInput