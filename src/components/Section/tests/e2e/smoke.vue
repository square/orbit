<template>
	<div class="smoke-tests">
		<o-section
			title="Content-less Section"
			variant="bordered"
			responsive-actions
		>
			<template slot="actions">
				<o-button @click="toggleContent">
					do the thing
				</o-button>
			</template>
			<template slot="description">
				hello i am the description do not be afraid of me i come in peace
			</template>
			<span v-if="content">{{ content }}</span>
		</o-section>

		<o-section title="Title">
			Odio ea dolore amet deserunt dolore voluptatem.
			Libero non recusandae magnam expedita quam quibusdam voluptas et sunt.
			Dolores quam dolorem quod facilis blanditiis explicabo blanditiis.
			Labore ut qui illum quibusdam accusamus corporis eaque officia.
			Inventore molestias et minus quo nihil temporibus porro tempora.
			Earum aut modi ab quaerat totam.
		</o-section>

		<o-section
			title="Title"
			variant="bordered"
		>
			Odio ea dolore amet deserunt dolore voluptatem.
			Libero non recusandae magnam expedita quam quibusdam voluptas et sunt.
			Dolores quam dolorem quod facilis blanditiis explicabo blanditiis.
			Labore ut qui illum quibusdam accusamus corporis eaque officia.
			Inventore molestias et minus quo nihil temporibus porro tempora.
			Earum aut modi ab quaerat totam.
		</o-section>

		<o-section
			title="Title"
			variant="raised"
		>
			Odio ea dolore amet deserunt dolore voluptatem.
			Libero non recusandae magnam expedita quam quibusdam voluptas et sunt.
			Dolores quam dolorem quod facilis blanditiis explicabo blanditiis.
			Labore ut qui illum quibusdam accusamus corporis eaque officia.
			Inventore molestias et minus quo nihil temporibus porro tempora.
			Earum aut modi ab quaerat totam.
		</o-section>

		<o-section
			title="Title"
			flush
		>
			Odio ea dolore amet deserunt dolore voluptatem.
			Libero non recusandae magnam expedita quam quibusdam voluptas et sunt.
			Dolores quam dolorem quod facilis blanditiis explicabo blanditiis.
			Labore ut qui illum quibusdam accusamus corporis eaque officia.
			Inventore molestias et minus quo nihil temporibus porro tempora.
			Earum aut modi ab quaerat totam.
		</o-section>

		<o-section
			title="Title"
			variant="bordered"
			flush
		>
			Odio ea dolore amet deserunt dolore voluptatem.
			Libero non recusandae magnam expedita quam quibusdam voluptas et sunt.
			Dolores quam dolorem quod facilis blanditiis explicabo blanditiis.
			Labore ut qui illum quibusdam accusamus corporis eaque officia.
			Inventore molestias et minus quo nihil temporibus porro tempora.
			Earum aut modi ab quaerat totam.
		</o-section>

		<o-section
			title="Title"
			variant="raised"
			flush
		>
			Odio ea dolore amet deserunt dolore voluptatem.
			Libero non recusandae magnam expedita quam quibusdam voluptas et sunt.
			Dolores quam dolorem quod facilis blanditiis explicabo blanditiis.
			Labore ut qui illum quibusdam accusamus corporis eaque officia.
			Inventore molestias et minus quo nihil temporibus porro tempora.
			Earum aut modi ab quaerat totam.
		</o-section>

		<o-section
			title="Title"
			collapsed
		>
			Odio ea dolore amet deserunt dolore voluptatem.
			Libero non recusandae magnam expedita quam quibusdam voluptas et sunt.
			Dolores quam dolorem quod facilis blanditiis explicabo blanditiis.
			Labore ut qui illum quibusdam accusamus corporis eaque officia.
			Inventore molestias et minus quo nihil temporibus porro tempora.
			Earum aut modi ab quaerat totam.
		</o-section>

		<o-section
			title="Title"
			variant="bordered"
			collapsed
		>
			Odio ea dolore amet deserunt dolore voluptatem.
			Libero non recusandae magnam expedita quam quibusdam voluptas et sunt.
			Dolores quam dolorem quod facilis blanditiis explicabo blanditiis.
			Labore ut qui illum quibusdam accusamus corporis eaque officia.
			Inventore molestias et minus quo nihil temporibus porro tempora.
			Earum aut modi ab quaerat totam.
		</o-section>

		<o-section
			title="Title"
			variant="raised"
			collapsed
		>
			Odio ea dolore amet deserunt dolore voluptatem.
			Libero non recusandae magnam expedita quam quibusdam voluptas et sunt.
			Dolores quam dolorem quod facilis blanditiis explicabo blanditiis.
			Labore ut qui illum quibusdam accusamus corporis eaque officia.
			Inventore molestias et minus quo nihil temporibus porro tempora.
			Earum aut modi ab quaerat totam.
		</o-section>

		<o-section
			title="Title"
			flush
			collapsed
		>
			Odio ea dolore amet deserunt dolore voluptatem.
			Libero non recusandae magnam expedita quam quibusdam voluptas et sunt.
			Dolores quam dolorem quod facilis blanditiis explicabo blanditiis.
			Labore ut qui illum quibusdam accusamus corporis eaque officia.
			Inventore molestias et minus quo nihil temporibus porro tempora.
			Earum aut modi ab quaerat totam.
		</o-section>

		<o-section
			title="Title"
			variant="bordered"
			flush
			collapsed
		>
			Odio ea dolore amet deserunt dolore voluptatem.
			Libero non recusandae magnam expedita quam quibusdam voluptas et sunt.
			Dolores quam dolorem quod facilis blanditiis explicabo blanditiis.
			Labore ut qui illum quibusdam accusamus corporis eaque officia.
			Inventore molestias et minus quo nihil temporibus porro tempora.
			Earum aut modi ab quaerat totam.
		</o-section>

		<o-section
			title="Title"
			variant="raised"
			flush
			collapsed
		>
			Odio ea dolore amet deserunt dolore voluptatem.
			Libero non recusandae magnam expedita quam quibusdam voluptas et sunt.
			Dolores quam dolorem quod facilis blanditiis explicabo blanditiis.
			Labore ut qui illum quibusdam accusamus corporis eaque officia.
			Inventore molestias et minus quo nihil temporibus porro tempora.
			Earum aut modi ab quaerat totam.
		</o-section>

		<o-section title="Business Address">
			<template slot="actions">
				<o-button>Reset</o-button>
				<o-button variant="primary">
					Apply
				</o-button>
			</template>

			Odio ea dolore amet deserunt dolore voluptatem.
			Libero non recusandae magnam expedita quam quibusdam voluptas et sunt.
			Dolores quam dolorem quod facilis blanditiis explicabo blanditiis.
			Labore ut qui illum quibusdam accusamus corporis eaque officia.
			Inventore molestias et minus quo nihil temporibus porro tempora.
			Earum aut modi ab quaerat totam.
		</o-section>

		<o-section variant="bordered">
			<o-section-header flush>
				Title
				<o-button
					slot="actions"
					variant="text"
				>
					Edit
				</o-button>
			</o-section-header>

			Odio ea dolore amet deserunt dolore voluptatem.
			Libero non recusandae magnam expedita quam quibusdam voluptas et sunt.
			Dolores quam dolorem quod facilis blanditiis explicabo blanditiis.
			Labore ut qui illum quibusdam accusamus corporis eaque officia.
			Inventore molestias et minus quo nihil temporibus porro tempora.
			Earum aut modi ab quaerat totam.
		</o-section>

		<o-section variant="bordered">
			<o-section-header title="Shipping Areas & Rules">
				<o-button
					slot="actions"
					variant="primary"
				>
					Add Shipping Area
				</o-button>
			</o-section-header>

			Odio ea dolore amet deserunt dolore voluptatem.
			Libero non recusandae magnam expedita quam quibusdam voluptas et sunt.
			Dolores quam dolorem quod facilis blanditiis explicabo blanditiis.
			Labore ut qui illum quibusdam accusamus corporis eaque officia.
			Inventore molestias et minus quo nihil temporibus porro tempora.
			Earum aut modi ab quaerat totam.
		</o-section>

		<o-section
			:collapsed.sync="collapsed"
			title="Allow in-store pickup"
		>
			Odio ea dolore amet deserunt dolore voluptatem.
			Libero non recusandae magnam expedita quam quibusdam voluptas et sunt.
			Dolores quam dolorem quod facilis blanditiis explicabo blanditiis.
			Labore ut qui illum quibusdam accusamus corporis eaque officia.
			Inventore molestias et minus quo nihil temporibus porro tempora.
			Earum aut modi ab quaerat totam.
		</o-section>

		<o-section>
			<o-section-header
				title="Shipping Areas & Rules"
				sticky
			>
				<o-button
					slot="actions"
					variant="primary"
				>
					Add Shipping Area
				</o-button>
			</o-section-header>

			Odio ea dolore amet deserunt dolore voluptatem.
			Libero non recusandae magnam expedita quam quibusdam voluptas et sunt.
			Dolores quam dolorem quod facilis blanditiis explicabo blanditiis.
			Labore ut qui illum quibusdam accusamus corporis eaque officia.
			Inventore molestias et minus quo nihil temporibus porro tempora.
			Earum aut modi ab quaerat totam.
		</o-section>

		<o-section variant="bordered">
			<o-section-header
				title="Shipping Areas & Rules"
				sticky
			>
				<o-button
					slot="actions"
					variant="primary"
				>
					Add Shipping Area
				</o-button>
			</o-section-header>

			Odio ea dolore amet deserunt dolore voluptatem.
			Libero non recusandae magnam expedita quam quibusdam voluptas et sunt.
			Dolores quam dolorem quod facilis blanditiis explicabo blanditiis.
			Labore ut qui illum quibusdam accusamus corporis eaque officia.
			Inventore molestias et minus quo nihil temporibus porro tempora.
			Earum aut modi ab quaerat totam.
		</o-section>

		<o-section variant="raised">
			<o-section title="Shipping Areas & Rules">
				Odio ea dolore amet deserunt dolore voluptatem.
				Libero non recusandae magnam expedita quam quibusdam voluptas et sunt.
				Dolores quam dolorem quod facilis blanditiis explicabo blanditiis.
				Labore ut qui illum quibusdam accusamus corporis eaque officia.
				Inventore molestias et minus quo nihil temporibus porro tempora.
				Earum aut modi ab quaerat totam.
			</o-section>
		</o-section>
	</div>
</template>

<script>
import { OSection, OSectionHeader } from '@square/orbit/components/Section';
import { OButton } from '@square/orbit/components/Button';

export default {
	components: {
		OSection,
		OSectionHeader,
		OButton,
	},

	data() {
		return {
			collapsed: false,
			content: 'some content',
		};
	},

	methods: {
		toggleContent() {
			if (this.content) {
				this.content = '';
			} else {
				this.content = 'some content';
			}
		},
	},
};
</script>

<style scoped>
.smoke-tests {
	margin-bottom: 100vh;
}

</style>
