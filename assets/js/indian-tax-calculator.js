// Indian Income Tax Calculator for FY 2024-25 (AY 2025-26)

class IndianTaxCalculator {
  constructor() {
    this.form = document.getElementById('taxCalculator');
    this.resultsContainer = document.getElementById('results');
    this.bracketBreakdown = document.getElementById('bracketBreakdown');
    
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.calculateTax();
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
      this.resetForm();
    });

    // Add input validation
    const inputs = this.form.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
      input.addEventListener('input', (e) => {
        if (e.target.value < 0) {
          e.target.value = 0;
        }
      });
    });
  }

  calculateTax() {
    const formData = this.getFormData();
    const taxCalculation = this.performTaxCalculation(formData);
    this.displayResults(taxCalculation);
  }

  getFormData() {
    return {
      taxPayerType: document.getElementById('taxPayerType').value,
      ageGroup: document.getElementById('ageGroup').value,
      salaryIncome: parseFloat(document.getElementById('annualIncome').value) || 0,
      businessIncome: parseFloat(document.getElementById('businessIncome').value) || 0,
      otherIncome: parseFloat(document.getElementById('otherIncome').value) || 0,
      standardDeduction: parseFloat(document.getElementById('standardDeduction').value) || 50000,
      section80C: parseFloat(document.getElementById('section80C').value) || 0,
      section80D: parseFloat(document.getElementById('section80D').value) || 0,
      otherDeductions: parseFloat(document.getElementById('otherDeductions').value) || 0,
      taxRegime: document.querySelector('input[name="taxRegime"]:checked').value
    };
  }

  performTaxCalculation(data) {
    // Calculate gross total income
    const grossIncome = data.salaryIncome + data.businessIncome + data.otherIncome;
    
    // Calculate total deductions based on regime
    let totalDeductions = 0;
    
    if (data.taxRegime === 'old') {
      totalDeductions = data.standardDeduction + data.section80C + data.section80D + data.otherDeductions;
      
      // Add age-based basic exemption for old regime
      if (data.ageGroup === '60to80') {
        totalDeductions += 300000; // Basic exemption for senior citizens
      } else if (data.ageGroup === 'above80') {
        totalDeductions += 500000; // Basic exemption for super senior citizens
      } else {
        totalDeductions += 250000; // Basic exemption for below 60
      }
    } else {
      // New regime - only basic exemption
      totalDeductions = 300000; // Basic exemption for all under new regime
    }
    
    // Calculate taxable income
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);
    
    // Calculate income tax based on regime and age
    let incomeTax = 0;
    let taxSlabs = [];
    
    if (data.taxRegime === 'old') {
      ({ incomeTax, taxSlabs } = this.calculateOldRegimeTax(taxableIncome, data.ageGroup));
    } else {
      ({ incomeTax, taxSlabs } = this.calculateNewRegimeTax(taxableIncome));
    }
    
    // Calculate education cess (4%: 3% education cess + 1% secondary and higher education cess)
    const educationCess = Math.round(incomeTax * 0.04);
    
    // Total tax liability
    const totalTax = incomeTax + educationCess;
    
    // Calculate effective tax rate
    const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome * 100) : 0;
    
    // Calculate take-home income
    const takeHomeIncome = grossIncome - totalTax;
    
    return {
      grossIncome,
      totalDeductions,
      taxableIncome,
      incomeTax,
      educationCess,
      totalTax,
      effectiveRate,
      takeHomeIncome,
      taxSlabs,
      regime: data.taxRegime,
      ageGroup: data.ageGroup
    };
  }

  calculateOldRegimeTax(taxableIncome, ageGroup) {
    let incomeTax = 0;
    let taxSlabs = [];
    
    // Old regime tax slabs for FY 2024-25
    if (taxableIncome <= 250000) {
      taxSlabs.push({ range: 'Up to ₹2,50,000', rate: '0%', tax: 0 });
    } else {
      let remainingIncome = taxableIncome;
      
      // First slab: Up to 2,50,000
      const slab1Tax = 0;
      taxSlabs.push({ range: 'Up to ₹2,50,000', rate: '0%', tax: slab1Tax });
      remainingIncome -= 250000;
      
      // Second slab: 2,50,001 to 5,00,000 (5%)
      if (remainingIncome > 0) {
        const slab2Income = Math.min(remainingIncome, 250000);
        const slab2Tax = Math.round(slab2Income * 0.05);
        taxSlabs.push({ range: '₹2,50,001 to ₹5,00,000', rate: '5%', tax: slab2Tax });
        incomeTax += slab2Tax;
        remainingIncome -= 250000;
      }
      
      // Third slab: 5,00,001 to 10,00,000 (20%)
      if (remainingIncome > 0) {
        const slab3Income = Math.min(remainingIncome, 500000);
        const slab3Tax = Math.round(slab3Income * 0.20);
        taxSlabs.push({ range: '₹5,00,001 to ₹10,00,000', rate: '20%', tax: slab3Tax });
        incomeTax += slab3Tax;
        remainingIncome -= 500000;
      }
      
      // Fourth slab: Above 10,00,000 (30%)
      if (remainingIncome > 0) {
        const slab4Tax = Math.round(remainingIncome * 0.30);
        taxSlabs.push({ range: 'Above ₹10,00,000', rate: '30%', tax: slab4Tax });
        incomeTax += slab4Tax;
      }
    }
    
    return { incomeTax, taxSlabs };
  }

  calculateNewRegimeTax(taxableIncome) {
    let incomeTax = 0;
    let taxSlabs = [];
    
    // New regime tax slabs for FY 2024-25
    if (taxableIncome <= 300000) {
      taxSlabs.push({ range: 'Up to ₹3,00,000', rate: '0%', tax: 0 });
    } else {
      let remainingIncome = taxableIncome;
      
      // First slab: Up to 3,00,000
      const slab1Tax = 0;
      taxSlabs.push({ range: 'Up to ₹3,00,000', rate: '0%', tax: slab1Tax });
      remainingIncome -= 300000;
      
      // Second slab: 3,00,001 to 7,00,000 (5%)
      if (remainingIncome > 0) {
        const slab2Income = Math.min(remainingIncome, 400000);
        const slab2Tax = Math.round(slab2Income * 0.05);
        taxSlabs.push({ range: '₹3,00,001 to ₹7,00,000', rate: '5%', tax: slab2Tax });
        incomeTax += slab2Tax;
        remainingIncome -= 400000;
      }
      
      // Third slab: 7,00,001 to 10,00,000 (10%)
      if (remainingIncome > 0) {
        const slab3Income = Math.min(remainingIncome, 300000);
        const slab3Tax = Math.round(slab3Income * 0.10);
        taxSlabs.push({ range: '₹7,00,001 to ₹10,00,000', rate: '10%', tax: slab3Tax });
        incomeTax += slab3Tax;
        remainingIncome -= 300000;
      }
      
      // Fourth slab: 10,00,001 to 12,00,000 (15%)
      if (remainingIncome > 0) {
        const slab4Income = Math.min(remainingIncome, 200000);
        const slab4Tax = Math.round(slab4Income * 0.15);
        taxSlabs.push({ range: '₹10,00,001 to ₹12,00,000', rate: '15%', tax: slab4Tax });
        incomeTax += slab4Tax;
        remainingIncome -= 200000;
      }
      
      // Fifth slab: 12,00,001 to 15,00,000 (20%)
      if (remainingIncome > 0) {
        const slab5Income = Math.min(remainingIncome, 300000);
        const slab5Tax = Math.round(slab5Income * 0.20);
        taxSlabs.push({ range: '₹12,00,001 to ₹15,00,000', rate: '20%', tax: slab5Tax });
        incomeTax += slab5Tax;
        remainingIncome -= 300000;
      }
      
      // Sixth slab: Above 15,00,000 (30%)
      if (remainingIncome > 0) {
        const slab6Tax = Math.round(remainingIncome * 0.30);
        taxSlabs.push({ range: 'Above ₹15,00,000', rate: '30%', tax: slab6Tax });
        incomeTax += slab6Tax;
      }
    }
    
    return { incomeTax, taxSlabs };
  }

  displayResults(calculation) {
    // Update result values
    document.getElementById('grossIncome').textContent = this.formatCurrency(calculation.grossIncome);
    document.getElementById('totalDeductions').textContent = this.formatCurrency(calculation.totalDeductions);
    document.getElementById('taxableIncome').textContent = this.formatCurrency(calculation.taxableIncome);
    document.getElementById('incomeTax').textContent = this.formatCurrency(calculation.incomeTax);
    document.getElementById('educationCess').textContent = this.formatCurrency(calculation.educationCess);
    document.getElementById('totalTax').textContent = this.formatCurrency(calculation.totalTax);
    document.getElementById('effectiveRate').textContent = calculation.effectiveRate.toFixed(2) + '%';
    document.getElementById('takeHomeIncome').textContent = this.formatCurrency(calculation.takeHomeIncome);
    
    // Display tax slabs breakdown
    this.displayTaxSlabs(calculation.taxSlabs);
    
    // Show results with animation
    this.resultsContainer.style.opacity = '0';
    setTimeout(() => {
      this.resultsContainer.style.opacity = '1';
      this.resultsContainer.style.transition = 'opacity 0.5s ease';
    }, 100);
  }

  displayTaxSlabs(taxSlabs) {
    this.bracketBreakdown.innerHTML = '';
    
    taxSlabs.forEach((slab, index) => {
      const slabElement = document.createElement('div');
      slabElement.className = 'bracket-item';
      slabElement.innerHTML = `
        <span class="bracket-range">${slab.range}</span>
        <span class="bracket-tax">${slab.rate} - ₹${slab.tax.toLocaleString('en-IN')}</span>
      `;
      
      // Add animation delay
      slabElement.style.opacity = '0';
      slabElement.style.transform = 'translateY(20px)';
      this.bracketBreakdown.appendChild(slabElement);
      
      setTimeout(() => {
        slabElement.style.opacity = '1';
        slabElement.style.transform = 'translateY(0)';
        slabElement.style.transition = 'all 0.3s ease';
      }, 100 + (index * 100));
    });
  }

  formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
  }

  resetForm() {
    this.form.reset();
    
    // Reset to default values
    document.getElementById('standardDeduction').value = '50000';
    
    // Clear results
    this.resultsContainer.style.opacity = '0';
    setTimeout(() => {
      document.getElementById('grossIncome').textContent = '₹0';
      document.getElementById('totalDeductions').textContent = '₹0';
      document.getElementById('taxableIncome').textContent = '₹0';
      document.getElementById('incomeTax').textContent = '₹0';
      document.getElementById('educationCess').textContent = '₹0';
      document.getElementById('totalTax').textContent = '₹0';
      document.getElementById('effectiveRate').textContent = '0%';
      document.getElementById('takeHomeIncome').textContent = '₹0';
      this.bracketBreakdown.innerHTML = '';
    }, 300);
  }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new IndianTaxCalculator();
});
