// Official Income Tax Calculator JavaScript
class OfficialTaxCalculator {
    constructor() {
        this.form = document.getElementById('taxCalculatorForm');
        this.resultsDisplay = document.getElementById('resultsDisplay');
        this.slabsBreakdown = document.getElementById('slabsBreakdown');
        this.deductionsSection = document.getElementById('deductionsSection');
        
        this.initializeEventListeners();
        this.toggleDeductions();
    }

    initializeEventListeners() {
        // Calculate button
        document.getElementById('calculateBtn').addEventListener('click', () => {
            this.calculateTax();
        });

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetForm();
        });

        // Tax regime change
        const regimeRadios = document.querySelectorAll('input[name="taxRegime"]');
        regimeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.toggleDeductions();
            });
        });

        // Input validation
        const inputs = this.form.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                if (e.target.value < 0) {
                    e.target.value = 0;
                }
            });
        });
    }

    toggleDeductions() {
        const selectedRegime = document.querySelector('input[name="taxRegime"]:checked').value;
        const deductionsSection = document.getElementById('deductionsSection');
        
        if (selectedRegime === 'new') {
            deductionsSection.style.opacity = '0.5';
            deductionsSection.style.pointerEvents = 'none';
            // Clear deduction values for new regime
            document.getElementById('section80C').value = '';
            document.getElementById('section80D').value = '';
            document.getElementById('section80E').value = '';
            document.getElementById('section80G').value = '';
            document.getElementById('section80TTA').value = '';
            document.getElementById('chapterVIDeductions').value = '';
        } else {
            deductionsSection.style.opacity = '1';
            deductionsSection.style.pointerEvents = 'auto';
        }
    }

    calculateTax() {
        const formData = this.getFormData();
        const calculation = this.performTaxCalculation(formData);
        this.displayResults(calculation);
    }

    getFormData() {
        return {
            taxpayerType: document.getElementById('taxpayerType').value,
            residentialStatus: document.getElementById('residentialStatus').value,
            ageGroup: document.getElementById('ageGroup').value,
            taxRegime: document.querySelector('input[name="taxRegime"]:checked').value,
            salaryIncome: parseFloat(document.getElementById('salaryIncome').value) || 0,
            housePropertyIncome: parseFloat(document.getElementById('housePropertyIncome').value) || 0,
            businessIncome: parseFloat(document.getElementById('businessIncome').value) || 0,
            capitalGains: parseFloat(document.getElementById('capitalGains').value) || 0,
            otherIncome: parseFloat(document.getElementById('otherIncome').value) || 0,
            chapterVIDeductions: parseFloat(document.getElementById('chapterVIDeductions').value) || 0,
            section80C: parseFloat(document.getElementById('section80C').value) || 0,
            section80D: parseFloat(document.getElementById('section80D').value) || 0,
            section80E: parseFloat(document.getElementById('section80E').value) || 0,
            section80G: parseFloat(document.getElementById('section80G').value) || 0,
            section80TTA: parseFloat(document.getElementById('section80TTA').value) || 0
        };
    }

    performTaxCalculation(data) {
        // Calculate gross total income
        const grossIncome = data.salaryIncome + data.housePropertyIncome + 
                           data.businessIncome + data.capitalGains + data.otherIncome;
        
        let totalDeductions = 0;
        let taxableIncome = grossIncome;
        
        if (data.taxRegime === 'old') {
            // Age-based basic exemption for old regime
            let basicExemption = 250000;
            if (data.ageGroup === '60to80') basicExemption = 300000;
            if (data.ageGroup === 'above80') basicExemption = 500000;
            
            // Standard deduction for salaried individuals
            let standardDeduction = 0;
            if (data.salaryIncome > 0) {
                standardDeduction = 50000;
            }
            
            totalDeductions = basicExemption + standardDeduction + 
                            data.chapterVIDeductions + data.section80C + 
                            data.section80D + data.section80E + data.section80G + data.section80TTA;
            
            taxableIncome = Math.max(0, grossIncome - totalDeductions);
            
            // Calculate tax using old regime slabs
            const incomeTax = this.calculateOldRegimeTax(taxableIncome, data.ageGroup);
            const educationCess = Math.round(IncomeTax * 0.02); // 2% Education cess
            const sheCess = Math.round(IncomeTax * 0.02); // 1% Secondary & Higher Education cess
            const totalTax = IncomeTax + educationCess + sheCess;
            
            return {
                grossIncome,
                totalDeductions,
                taxableIncome,
                incomeTax,
                educationCess,
                sheCess,
                totalTax,
                effectiveRate: grossIncome > 0 ? (totalTax / grossIncome * 100) : 0,
                takeHomeIncome: grossIncome - totalTax,
                regime: 'Old',
                slabs: this.getOldRegimeSlabs(taxableIncome, data.ageGroup)
            };
        } else {
            // New regime - only basic exemption
            const basicExemption = {
                'below60': 250000,
                '60to80': 250000,
                'above80': 500000
            }[data.ageGroup] || 250000;
            
            taxableIncome = Math.max(0, grossIncome - basicExemption);
            
            // Calculate tax using new regime slabs
            const IncomeTax = this.calculateNewRegimeTax(taxableIncome);
            const educationCess = Math.round(IncomeTax * 0.02); // 2% Education cess
            const sheCess = Math.round(IncomeTax * 0.02); // 1% Secondary & Higher Education cess
            const totalTax = IncomeTax + educationCess + sheCess;
            
            return {
                grossIncome,
                totalDeductions: basicExemption,
                taxableIncome,
                incomeTax,
                educationCess,
                sheCess,
                totalTax,
                effectiveRate: grossIncome > 0 ? (totalTax / grossIncome * 100) : 0,
                takeHomeIncome: grossIncome - totalTax,
                regime: 'New',
                slabs: this.getNewRegimeSlabs(taxableIncome)
            };
        }
    }

    calculateOldRegimeTax(income, ageGroup) {
        let tax = 0;
        
        if (income <= 250000) return 0;
        
        let remaining = Income - 250000;
        
        // 5% on 2,50,001 to 5,00,000
        if (remaining > 0) {
            const slab2 = Math.min(remaining, 250000);
            tax += slab2 * 0.05;
            remaining -= 250000;
        }
        
        // 20% on 5,00,001 to 10,00,000
        if (remaining > 0) {
            const slab3 = Math.min(remaining, 500000);
            tax += slab3 * 0.20;
            remaining -= 500000;
        }
        
        // 30% on above 10,00,000
        if (remaining > 0) {
            tax += remaining * 0.30;
        }
        
        return Math.round(tax);
    }

    calculateNewRegimeTax(income) {
        let tax = 0;
        
        if (income <= 300000) return 0;
        
        let remaining = Income - 300000;
        
        // 5% on 3,00,001 to 7,00,000
        if (remaining > 0) {
            const slab2 = Math.min(remaining, 400000);
            tax += slab2 * 0.05;
            remaining -= 400000;
        }
        
        // 10% on 7,00,001 to 10,00,000
        if (remaining > 0) {
            const slab3 = Math.min(remaining, 300000);
            tax += slab3 * 0.10;
            remaining -= 300000;
        }
        
        // 15% on 10,00,001 to 12,00,000
        if (remaining > 0) {
            const slab4 = Math.min(remaining, 200000);
            tax += slab4 * 0.15;
            remaining -= 200000;
        }
        
        // 20% on 12,00,001 to 15,00,000
        if (remaining > 0) {
            const slab5 = Math.min(remaining, 300000);
            tax += slab5 * 0.20;
            remaining -= 300000;
        }
        
        // 30% on above 15,00,000
        if (remaining > 0) {
            tax += remaining * 0.30;
        }
        
        return Math.round(tax);
    }

    getOldRegimeSlabs(income, ageGroup) {
        const slabs = [];
        
        if (income <= 250000) {
            slabs.push({ range: 'Up to ₹2,50,000', rate: '0%', tax: 0 });
        } else {
            let remaining = Income - 250000;
            
            // First slab
            const slab1Tax = 0;
            const slab1Income = 250000;
            slabs.push({ range: 'Up to ₹2,50,000', rate: '0%', tax: slab1Tax, income: slab1Income });
            remaining -= 250000;
            
            // Second slab: 2,50,001 to 5,00,000 (5%)
            if (remaining > 0) {
                const slab2Income = Math.min(remaining, 250000);
                const slab2Tax = Math.round(slab2Income * 0.05);
                slabs.push({ range: '₹2,50,001 to ₹5,00,000', rate: '5%', tax: slab2Tax, income: slab2Income });
                remaining -= 250000;
            }
            
            // Third slab: 5,00,001 to 10,00,000 (20%)
            if (remaining > 0) {
                const slab3Income = Math.min(remaining, 500000);
                const slab3Tax = Math.round(slab3Income * 0.20);
                slabs.push({ range: '₹5,00,001 to ₹10,00,000', rate: '20%', tax: slab3Tax, income: slab3Income });
                remaining -= 500000;
            }
            
            // Fourth slab: Above 10,00,000 (30%)
            if (remaining > 0) {
                const slab4Income = remaining;
                const slab4Tax = Math.round(slab4Income * 0.30);
                slabs.push({ range: 'Above ₹10,00,000', rate: '30%', tax: slab4Tax, income: slab4Income });
            }
        }
        
        return slabs;
    }

    getNewRegimeSlabs(income) {
        const slabs = [];
        
        if (income <= 300000) {
            slabs.push({ range: 'Up to ₹3,00,000', rate: '0%', tax: 0 });
        } else {
            let remaining = Income - 300000;
            
            // First slab
            const slab1Tax = 0;
            const slab1Income = 300000;
            slabs.push({ range: 'Up to ₹3,00,000', rate: '0%', tax: slab1Tax, income: slab1Income });
            remaining -= 300000;
            
            // Second slab: 3,00,001 to 7,00,000 (5%)
            if (remaining > 0) {
                const slab2Income = Math.min(remaining, 400000);
                const slab2Tax = Math.round(slab2Income * 0.05);
                slabs.push({ range: '₹3,00,001 to ₹7,00,000', rate: '5%', tax: slab2Tax, income: slab2Income });
                remaining -= 400000;
            }
            
            // Third slab: 7,00,001 to 10,00,000 (10%)
            if (remaining > 0) {
                const slab3Income = Math.min(remaining, 300000);
                const slab3Tax = Math.round(slab3Income * 0.10);
                slabs.push({ range: '₹7,00,001 to ₹10,00,000', rate: '10%', tax: slab3Tax, income: slab3Income });
                remaining -= 300000;
            }
            
            // Fourth slab: 10,00,001 to 12,00,000 (15%)
            if (remaining > 0) {
                const slab4Income = Math.min(remaining, 200000);
                const slab4Tax = Math.round(slab4Income * 0.15);
                slabs.push({ range: '₹10,00,001 to ₹12,00,000', rate: '15%', tax: slab4Tax, income: slab4Income });
                remaining -= 200000;
            }
            
            // Fifth slab: 12,00,001 to 15,00,000 (20%)
            if (remaining > 0) {
                const slab5Income = Math.min(remaining, 300000);
                const slab5Tax = Math.round(slab5Income * 0.20);
                slabs.push({ range: '₹12,00,001 to ₹15,00,000', rate: '20%', tax: slab5Tax, income: slab5Income });
                remaining -= 300000;
            }
            
            // Sixth slab: Above 15,00,000 (30%)
            if (remaining > 0) {
                const slab6Income = remaining;
                const slab6Tax = Math.round(slab6Income * 0.30);
                slabs.push({ range: 'Above ₹15,00,000', rate: '30%', tax: slab6Tax, income: slab6Income });
            }
        }
        
        return slabs;
    }

    displayResults(calculation) {
        // Show results panel
        this.resultsDisplay.style.display = 'block';
        
        // Update result values
        document.getElementById('grossIncome').textContent = this.formatCurrency(calculation.grossIncome);
        document.getElementById('totalDeductions').textContent = this.formatCurrency(calculation.totalDeductions);
        document.getElementById('taxableIncome').textContent = this.formatCurrency(calculation.taxableIncome);
        document.getElementById('incomeTax').textContent = this.formatCurrency(calculation.incomeTax);
        document.getElementById('educationCess').textContent = this.formatCurrency(calculation.educationCess);
        document.getElementById('sheCess').textContent = this.formatCurrency(calculation.sheCess);
        document.getElementById('totalTax').textContent = this.formatCurrency(calculation.totalTax);
        document.getElementById('effectiveRate').textContent = calculation.effectiveRate.toFixed(2) + '%';
        document.getElementById('takeHomeIncome').textContent = this.formatCurrency(calculation.takeHomeIncome);
        
        // Display tax slabs breakdown
        this.displaySlabsBreakdown(calculation.slabs);
        
        // Scroll to results
        this.resultsDisplay.scrollIntoView({ behavior: 'smooth' });
    }

    displaySlabsBreakdown(slabs) {
        this.slabsBreakdown.innerHTML = '';
        
        slabs.forEach((slab, index) => {
            const slabElement = document.createElement('div');
            slabElement.innerHTML = `
                <strong>₹${slab.income.toLocaleString('en-IN')}</strong> - ${slab.range}: ${slab.rate} = <strong>₹${slab.tax.toLocaleString('en-IN')}</strong>
            `;
            
            this.slabsBreakdown.appendChild(slabElement);
        });
    }

    formatCurrency(amount) {
        return '₹' + amount.toLocaleString('en-IN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    }

    resetForm() {
        // Reset form fields
        this.form.reset();
        
        // Reset to default values
        document.querySelector('input[name="taxRegime"][value="new"]').checked = true;
        
        // Clear results
        this.resultsDisplay.style.display = 'none';
        
        // Clear slabs breakdown
        this.slabsBreakdown.innerHTML = '';
        
        // Reset deductions visibility
        this.toggleDeductions();
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new OfficialTaxCalculator();
});
