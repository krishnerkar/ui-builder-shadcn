<script>
  let count = 0;
</script>

<button on:click={() => count++}>
  Count: {count}
</button>

<style>
  button {
    padding: 8px 16px;
    background: #4299e1;
    color: white;
    border: none;
    border-radius: 4px;
  }
</style>