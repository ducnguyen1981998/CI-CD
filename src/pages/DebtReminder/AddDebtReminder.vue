<template>
  <div class="content">
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item md-medium-size-100 md-size-50">
        <debt-reminder-form data-background-color="green"> </debt-reminder-form>
      </div>
    </div>
  </div>
</template>

<script>
import { DebtReminderForm } from "../../components/Forms";

export default {
  components: {
    DebtReminderForm
  }
};
</script>
