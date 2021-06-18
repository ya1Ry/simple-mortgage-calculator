function PMT(ir, np, pv, fv, type) {
    /*
     * ir   - interest rate per month
     * np   - number of periods (months)
     * pv   - present value
     * fv   - future value
     * type - when the payments are due:
     *        0: end of the period, e.g. end of month (default)
     *        1: beginning of period
     */
    var pmt, pvif;

    fv || (fv = 0);
    type || (type = 0);

    if (ir === 0)
        return -(pv + fv)/np;

    pvif = Math.pow(1 + ir, np);
    pmt = - ir * (pv * pvif + fv) / (pvif - 1);

    if (type === 1)
        pmt /= (1 + ir);

    return pmt;
}

function returnInfo() {
	var priceOfProperty = document.getElementById('priceOfProperty').value;
	var termInYears = document.getElementById('termInYears').value;
	var initialDeposit = document.getElementById('initialDeposit').value;
	var interestRate = document.getElementById('interestRate').value;

	if (priceOfProperty == '' || priceOfProperty < 0) {
		alert('Please enter the price of the property.')
	} else if (initialDeposit == '' || initialDeposit < 0) {
		alert('Please enter the initial deposit.')
	} else	{
		var np = termInYears * 12;
		var ir = ('0.0'+interestRate.replace('.',''))/12;
		var pv = priceOfProperty-initialDeposit;
		var pmt = PMT(ir, np, pv).toFixed(2)
		var payoff = pmt * np
		var finalResultMonthly = Math.abs(Math.round(pmt));
		var finalResultTotal = Math.abs(Math.round(payoff));
		document.getElementById('result').innerHTML=('<br>Monthly payments:'+'<br>'+'$'+finalResultMonthly+'<br>'+'Total payments:'+'<br>'+'$'+finalResultTotal);

	}

}