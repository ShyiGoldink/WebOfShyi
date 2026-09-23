<template>
  <img class="avatar" src="./images/avatar.svg" alt="头像" />
</template>

<style scoped>
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
}

/* 屏幕宽度 ≤ 600px */
@media (max-width: 600px) {
  .avatar {
    width: 120px;
    height: 120px;
  }
}
</style>
