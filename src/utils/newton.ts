// Calcula el array de coeficientes [a0, a1, …, a_{n-1}] 
// tal que P(x) = a0 + a1*(x-x0) + a2*(x-x0)*(x-x1) + …
// x:  [x0, x1, …, x_{n-1}]
// y:  [y0, y1, …, y_{n-1}]
export function dividedDifferences(x: number[], y: number[]): number[] {
  const n = x.length;
  const coef = y.slice();             // copia de y
  for (let i = 1; i < n; i++) {
    // vamos “subiendo” la columna j=i
    for (let j = n - 1; j >= i; j--) {
      coef[j] = (coef[j] - coef[j - 1]) / (x[j] - x[j - i]);
    }
  }
  return coef;  // coef[j] = f[x0,…,xj]
}

// Evalúa el polinomio de Newton en un punto x0
// coefs: [a0, a1, a2, …]
// xPoints: [x0, x1, x2, …]
export function newtonPolynomial(coefs: number[], xPoints: number[], x0: number): number {
  let result = coefs[0];
  let product = 1;
  for (let i = 1; i < coefs.length; i++) {
    product *= (x0 - xPoints[i - 1]);
    result += coefs[i] * product;
  }
  return result;
}