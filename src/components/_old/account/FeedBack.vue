<template>
    <div class="Feedback">
        <transition-group name="fade" appear>
            <div class="question" v-for="(question, index) in questions" :key="index">
                <div class="question__avatar"></div>
                <div class="container">
                    <div class="question__wrapper">
                        <div class="question__name">{{ question.UserNick }}</div>
                        <div class="question__date">{{ question.Date }}</div>
                    </div>
                    <div class="question__text">
                        {{ question.Text }}
                    </div>
                    <div class="answer" v-if="question.AnswerOut">
                        <div class="answer__wrapper">
                            <div class="question__name">{{ question.AnswerOut.UserNick }}</div>
                            <div class="question__date">{{ question.AnswerOut.Date }}</div>
                        </div>
                        <div class="answer__text">
                            {{ question.Text }}
                        </div>
                    </div>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
export default {
  name: 'Messages',
  data () {
    return {
      data: ''
    }
  },
  computed: {
    questions: function () {
      return this.$store.getters['feedback/getQuestions']
    }
  },
  beforeCreate: function () {
    this.$store.dispatch('feedback/getQuestions')
  }
}
</script>

<style lang="scss" scoped>
    @import '../../main.scss';
    .Feedback {
        width: 310px;
        height: auto;
        margin: 10px auto;
        color: $text-color;
        @include waterfall(15, .1, fade);

        .question {
            margin-top: 12px;
            width: 100%;
            padding: 10px;
            display: flex;
            flex-direction: row;
            background-color: $background_module-color;
            border-radius: 15px;

            .question__avatar {
                width: 40px;
                height: 40px;
                background-color: $accent-color;
                border-radius: 20px;
            }

            .container {
                width: 250px;
                padding-left: 10px;

                .question__wrapper {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;

                    .question__name {
                        font-size: 14px;
                    }
                    .question__date {
                        font-size: 12px;
                        color: $secondary-color;
                    }
                }

                .question__text {
                    padding-top: 10px;
                    font-size: 13px;
                }

                .answer {
                    padding: 10px;
                    margin-top: 15px;
                    margin-left: 20px;
                    border-radius: 12px;
                    background-color: $background_module__light-color;
                    position: relative;

                    &:before {
                        content: '';
                        background-image: url("../../assets/arrow.png");
                        background-size: cover;
                        position: absolute;
                        top: 3px;
                        left: -25px;
                        width: 20px;
                        height: 20px;
                    }

                    .answer__wrapper {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;

                        .question__name {
                            font-size: 14px;
                            color: $secondary-color;
                        }
                        .question__date {
                            font-size: 12px;
                            color: $secondary-color;
                        }
                    }

                    .answer__text {
                        padding-top: 10px;
                        font-size: 13px;
                        text-align: right;
                        color: $secondary-color;
                    }
                }
            }
        }
    }
</style>
