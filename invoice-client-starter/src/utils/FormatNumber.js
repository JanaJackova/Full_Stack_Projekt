import 'bootstrap/dist/css/bootstrap.min.css';

export function formatNumber(num) {
  if (num === undefined || num === null) {
    return '0.00'; // nebo jiný výchozí formátovaný výstup
  }
  return num.toLocaleString('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
