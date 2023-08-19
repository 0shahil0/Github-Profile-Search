const searchBtn = document.getElementById('searchBtn');
const usernameInput = document.getElementById('username');
const userInfoDiv = document.getElementById('userInfo');

// Function to fetch user data
function fetchUserData(username) {
  fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data => {
      const userHTML = `
        <img src="${data.avatar_url}" alt="${username}'s avatar" />
        <h2>${data.name}</h2>
        <p>${data.bio || 'No bio available.'}</p>
        <p>Followers: ${data.followers}</p>
        <p>Following: ${data.following}</p>
        <p>Public Repositories: ${data.public_repos}</p>
      `;
      userInfoDiv.innerHTML = userHTML;
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      userInfoDiv.innerHTML = '<p>Error fetching user data. Please try again later.</p>';
    });
}

// Search button click event
searchBtn.addEventListener('click', () => {
  const username = usernameInput.value;
  if (username === '') {
    alert('Please enter a username.');
    return;
  }

  fetchUserData(username);
});

// Enter key press event in the input field
usernameInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    const username = usernameInput.value;
    if (username === '') {
      alert('Please enter a username.');
      return;
    }

    fetchUserData(username);
  }
});
