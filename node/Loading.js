const Loading = Ractive.extend({
  template: `
    <div class="loading">
      <div class="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  `,
  css: `
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 30px auto;
    }
    .loading-spinner {
      border: 16px solid #f3f3f3;
      border-top: 16px solid #3498db;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      animation: spin 2s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `
});

export default Loading;
