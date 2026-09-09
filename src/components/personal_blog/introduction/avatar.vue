 <template>
    /**
 * 这里是头像的部分,我需要在这里调用头像的资源,并且建立环型区域
 * 看上去并不需要script部分,应该只需要style就够了?
 */
  <img class="avatar" src="./images/avatar.svg" />
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