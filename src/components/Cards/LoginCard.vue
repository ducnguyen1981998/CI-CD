<template>
  <md-card class="md-card-login" :class="{ 'md-card-hidden': cardHidden }">
    <md-card-header :class="getClass(headerColor)">
      <slot name="title"></slot>
      <div class="social-line">
        <slot name="buttons"></slot>
      </div>
    </md-card-header>

    <md-card-content>
      <slot name="description"></slot>
      <slot name="inputs"></slot>
    </md-card-content>

    <md-card-actions>
      <slot name="footer"></slot>
      <slot name="forget"></slot>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: "login-card",
  props: {
    headerColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      cardHidden: true
    };
  },
  beforeMount() {
    setTimeout(this.showCard, 400);
  },
  methods: {
    showCard: function() {
      this.cardHidden = false;
    },
    getClass: function(headerColor) {
      return "md-card-header-" + headerColor + "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/material-kit.scss";
@import "../../assets/demo.css";

.md-card-login {
  margin: 0 auto;

  .md-button {
    margin: 0.3125rem 1px;
  }

  .social-line {
    margin-top: 1rem;
  }

  .md-card-header,
  .description {
    text-align: center;
  }

  &.md-card-hidden {
    opacity: 0;
    transform: translate3d(0, -60px, 0);
  }

  .md-card-content {
    padding-top: 0;
  }

  .description {
    margin-top: 0;
  }

  .md-card-actions {
    border: 0;
    justify-content: center;
  }
}
</style>
